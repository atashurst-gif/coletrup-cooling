"""Build src/data/uk-map.json — a stylised full-UK map with the North West service
region (Lancashire, Greater Manchester, Merseyside, Cheshire) as separate shapes.

Sources (fetched into tools/map/src/ from GitHub):
  * martinjc/UK-GeoJSON — ONS generalised boundaries:
      json/electoral/eng/eer.json  (English regions)   json/electoral/sco|wal|ni/eer.json
      json/administrative/eng/topo_lad.json (English local authority districts → counties)
  * Natural Earth 50m countries (Ireland + Isle of Man, context only)

Projection: plate carrée scaled by cos(54°) so the map isn't stretched; 1° lat = 100 units.
"""
import json, math
from shapely.geometry import shape, box, mapping, MultiPolygon, Polygon
from shapely.ops import unary_union

SRC = 'tools/map/src/'
LAT0, LON0 = 60.0, -8.6           # top-left of the viewBox in degrees
K = 100.0                          # units per degree of latitude
COS = math.cos(math.radians(54.0))


def px(lon, lat):
    return ((lon - LON0) * K * COS, (LAT0 - lat) * K)


def geo(path):
    return json.load(open(path))


# ---------- TopoJSON decoder (enough for this file) ----------
def topo_geoms(t, obj='lad'):
    tr = t.get('transform')
    arcs = []
    for arc in t['arcs']:
        pts, x, y = [], 0, 0
        for dx, dy in arc:
            x += dx; y += dy
            if tr:
                pts.append((x * tr['scale'][0] + tr['translate'][0], y * tr['scale'][1] + tr['translate'][1]))
            else:
                pts.append((x, y))
        arcs.append(pts)

    def ring(idx):
        out = []
        for i in idx:
            a = arcs[i] if i >= 0 else arcs[~i][::-1]
            if out and out[-1] == a[0]:
                out.extend(a[1:])
            else:
                out.extend(a)
        return out

    def poly(rings):
        rs = [ring(r) for r in rings]
        return Polygon(rs[0], rs[1:]) if len(rs[0]) >= 4 else None

    for g in t['objects'][obj]['geometries']:
        if g['type'] == 'Polygon':
            p = poly(g['arcs'])
        elif g['type'] == 'MultiPolygon':
            ps = [poly(r) for r in g['arcs']]
            p = MultiPolygon([q for q in ps if q])
        else:
            continue
        if p is not None:
            yield g['properties'], p.buffer(0)


# ---------- load ----------
# pre-simplify at load: the source files are far more detailed than the map needs
NEAR = {'North West', 'Yorkshire and The Humber', 'West Midlands', 'East Midlands'}
eng = {}
for f in geo(SRC + 'eer.json')['features']:
    name = f['properties']['EER13NM']
    eng[name] = shape(f['geometry']).buffer(0).simplify(0.0015 if name in NEAR else 0.006, preserve_topology=True)
sco = unary_union([shape(f['geometry']).buffer(0).simplify(0.006, preserve_topology=True) for f in geo(SRC + 'electoral_sco_eer.json')['features']])
wal = unary_union([shape(f['geometry']).buffer(0).simplify(0.0015, preserve_topology=True) for f in geo(SRC + 'electoral_wal_eer.json')['features']])
ni = unary_union([shape(f['geometry']).buffer(0).simplify(0.006, preserve_topology=True) for f in geo(SRC + 'electoral_ni_eer.json')['features']])

ne = geo(SRC + 'ne_50m_countries.geojson')['features']
ire = [shape(f['geometry']) for f in ne if f['properties'].get('ADMIN') == 'Ireland'][0]
iom = [shape(f['geometry']) for f in ne if f['properties'].get('ADMIN') == 'Isle of Man'][0]

COUNTIES = {
    'lancashire': ['Blackburn with Darwen', 'Blackpool', 'Burnley', 'Chorley', 'Fylde', 'Hyndburn', 'Lancaster', 'Pendle', 'Preston', 'Ribble Valley', 'Rossendale', 'South Ribble', 'West Lancashire', 'Wyre'],
    'greater-manchester': ['Bolton', 'Bury', 'Manchester', 'Oldham', 'Rochdale', 'Salford', 'Stockport', 'Tameside', 'Trafford', 'Wigan'],
    'merseyside': ['Knowsley', 'Liverpool', 'Sefton', 'St. Helens', 'Wirral'],
    'cheshire': ['Cheshire East', 'Cheshire West and Chester', 'Halton', 'Warrington'],
}
lads = {p['LAD13NM']: g for p, g in topo_geoms(geo(SRC + 'administrative_eng_topo_lad.json'))}
counties = {k: unary_union([lads[n] for n in names]) for k, names in COUNTIES.items()}
for k, names in COUNTIES.items():
    missing = [n for n in names if n not in lads]
    assert not missing, missing
nw = unary_union(list(counties.values()))

# ---------- simplify: fine inside the zoom window, coarse elsewhere ----------
minx, miny, maxx, maxy = nw.bounds
zoom_win = box(minx - 0.75, miny - 0.45, maxx + 0.75, maxy + 0.45)


def drop_islets(g, min_area):
    polys = list(g.geoms) if hasattr(g, 'geoms') else [g]
    keep = [p for p in polys if p.area >= min_area]
    return MultiPolygon(keep) if len(keep) > 1 else keep[0]


def close(g, r):
    """Morphological closing: fills tidal-river cracks narrower than ~2r degrees."""
    return g.buffer(r, join_style=2).buffer(-r, join_style=2).buffer(0)


def two_level(g, fine=0.004, coarse=0.035):
    a = close(g, 0.006).simplify(fine, preserve_topology=True).intersection(zoom_win)
    b = close(g, 0.02).simplify(coarse, preserve_topology=True).difference(zoom_win)
    return drop_islets(unary_union([a, b]).buffer(0), 0.008)


# Land = everything except the four service counties (they are drawn separately, on top),
# so the coastline inside the region comes from the county geometry alone (no double edges).
cumbria = eng['North West'].difference(nw.buffer(0.0005)).buffer(0)
others = unary_union([g for n, g in eng.items() if n != 'North West'] + [sco, wal, ni, cumbria])
land = two_level(others)
england = unary_union(list(eng.values()))
# faint interior borders: Scotland/England and Wales/England (the coast is already the land edge)
borders = unary_union([
    sco.boundary.intersection(england.boundary.buffer(0.002)),
    wal.boundary.intersection(england.boundary.buffer(0.002)),
]).simplify(0.01)
counties_s = {k: close(g, 0.004).simplify(0.003, preserve_topology=True).buffer(0) for k, g in counties.items()}
nw_s = unary_union(list(counties_s.values())).buffer(0)
ire_s = ire.simplify(0.012)
iom_s = iom.simplify(0.003)


# ---------- to SVG path ----------
WIN = None  # set below: zoom window in px, where 1-decimal precision is kept


def fmt(x, y, nd):
    if WIN and not (WIN[0] <= x <= WIN[2] and WIN[1] <= y <= WIN[3]):
        return f'{x:.0f} {y:.0f}'
    return f'{x:.{nd}f} {y:.{nd}f}'


def path(g, nd=1):
    polys = list(g.geoms) if hasattr(g, 'geoms') else [g]
    d = []
    for p in polys:
        if p.is_empty or p.area < 1e-5:
            continue
        # skip anything entirely above the viewBox (Shetland)
        if px(0, p.bounds[1])[1] < 0:
            continue
        for ring in [p.exterior] + list(p.interiors):
            pts = [px(x, y) for x, y in ring.coords]
            d.append('M' + 'L'.join(fmt(x, y, nd) for x, y in pts) + 'Z')
    return ''.join(d)


def line_path(g, nd=1):
    lines = list(g.geoms) if hasattr(g, 'geoms') else [g]
    d = []
    for ln in lines:
        if ln.is_empty or ln.length < 0.01:
            continue
        pts = [px(x, y) for x, y in ln.coords]
        d.append('M' + 'L'.join(f'{x:.{nd}f} {y:.{nd}f}' for x, y in pts))
    return ''.join(d)


def bbox_px(g):
    x0, y0, x1, y1 = g.bounds
    a, b = px(x0, y1), px(x1, y0)
    return [round(a[0], 1), round(a[1], 1), round(b[0], 1), round(b[1], 1)]


def rep(g):
    if hasattr(g, 'geoms'):
        g = max(g.geoms, key=lambda q: q.area)
    p = g.representative_point()
    x, y = px(p.x, p.y)
    return [round(x, 1), round(y, 1)]


wx0, wy0 = px(zoom_win.bounds[0], zoom_win.bounds[3])
wx1, wy1 = px(zoom_win.bounds[2], zoom_win.bounds[1])
WIN = (wx0, wy0, wx1, wy1)
# viewBox: lon -8.6..2.0, lat 60.0..49.8 (Shetland left out, Orkney in)
W = (2.0 - LON0) * K * COS
H = (LAT0 - 49.8) * K
out = {
    'viewBox': [0, 0, round(W, 1), round(H, 1)],
    'proj': {'lat0': LAT0, 'lon0': LON0, 'k': K, 'cos': COS},
    'land': path(land),
    'borders': line_path(borders),
    'counties': {k: path(g) for k, g in counties_s.items()},
    'nw': path(nw_s),
    'nwBox': bbox_px(nw_s),
    'nwCenter': [round((bbox_px(nw_s)[0] + bbox_px(nw_s)[2]) / 2, 1), round((bbox_px(nw_s)[1] + bbox_px(nw_s)[3]) / 2, 1)],
    'labels': {k: rep(g) for k, g in counties_s.items()},
    'ireland': path(ire_s),
    'iom': path(iom_s),
}
json.dump(out, open('src/data/uk-map.json', 'w'), separators=(',', ':'))
size = len(json.dumps(out))
print('viewBox', out['viewBox'], 'nwBox', out['nwBox'], 'center', out['nwCenter'])
print('bytes', size, {k: len(v) if isinstance(v, str) else sum(len(x) for x in v.values()) for k, v in out.items() if k in ('land', 'borders', 'counties', 'nw', 'ireland', 'iom')})
