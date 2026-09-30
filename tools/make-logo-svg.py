"""Build a true vector (SVG) version of the supplied Coletrup Cooling logo.

The supplied artwork is a raster. To get a crisp logo at every size:
  * the mark (chevron + waves) is traced from the raster at 4x with potrace,
  * the lettering is set from the same typeface the artwork uses (Montserrat —
    verified by overlay), each glyph positioned and sized to the raster's own
    letter positions, so spacing and proportions match the original,
  * colours are sampled from the artwork itself.

Outputs public/brand/coletrup-cooling-logo.svg (+ a dark-background variant with
the navy lettering reversed to white) and refreshes the PNG/WebP fallbacks.
"""
import numpy as np, cv2, potrace, io
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

SRC = 'tools/logo-source/coletrup-cooling-logo-cutout.png'  # cut-out of the supplied artwork (the source of truth)
FONT = 'node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2'
NAVY, ORANGE, BLUE = '#01284f', '#fd7e1c', '#0199dd'
W, H = 1026, 899

a = np.array(Image.open(SRC).convert('RGBA'))
rgb = a[..., :3].astype(int)
alpha = a[..., 3].astype(np.float32) / 255.0
op = alpha > 0.5
ref = {'navy': (1, 40, 79), 'orange': (253, 126, 28), 'blue': (1, 153, 221)}
dists = np.stack([np.sqrt(((rgb - np.array(c)) ** 2).sum(-1)) for c in ref.values()])
cls = np.argmin(dists, axis=0)  # 0 navy, 1 orange, 2 blue


# ---------- text lines: measure the raster's letter runs ----------
def runs_in(y0, y1, gap=1):
    m = op[y0:y1 + 1]
    xs = np.where(m.any(axis=0))[0]
    runs, s, p = [], xs[0], xs[0]
    for x in xs[1:]:
        if x > p + gap:
            runs.append((int(s), int(p)))
            s = x
        p = x
    runs.append((int(s), int(p)))
    out = []
    for x0, x1 in runs:
        ys = np.where(m[:, x0:x1 + 1].any(axis=1))[0]
        out.append(dict(x0=x0, x1=x1, y0=int(ys.min() + y0), y1=int(ys.max() + y0)))
    return out


LINES = [
    # text, band rows, flat-letter cap rows (baseline = cap_y1), colour
    # weight = Montserrat wght whose stem/cap ratio matches the artwork's measured stems
    dict(text='COLETRUP', band=(546, 647), cap=(548, 645), colour=NAVY, weight=730),
    dict(text='COOLING', band=(676, 731), cap=(677, 731), colour=ORANGE, weight=700),
    dict(text='AIR CONDITIONING | REFRIGERATION', band=(775, 803), cap=(778, 800), colour=NAVY, weight=700, accents={'|': ORANGE}),
    dict(text='KEEPING IT COOL', band=(847, 874), cap=(848, 873), colour=NAVY, weight=640),
]

base_font = TTFont(FONT)
UPEM = base_font['head'].unitsPerEm
CAP_UNITS = 700  # Montserrat cap height
_fonts = {}


def font_at(w):
    if w not in _fonts:
        _fonts[w] = instancer.instantiateVariableFont(TTFont(FONT), {'wght': w})
    return _fonts[w]


def glyph_of(font, ch):
    return font.getGlyphSet()[font.getBestCmap()[ord(ch)]]


def glyph_bounds(font, ch):
    g = glyph_of(font, ch)
    bp = BoundsPen(font.getGlyphSet())
    g.draw(bp)
    return bp.bounds  # xMin,yMin,xMax,yMax (font units)


def line_paths(line):
    """Return (svg path elements, chosen weight, width error) for one text line."""
    chars = [c for c in line['text'] if c != ' ']
    runs = runs_in(*line['band'])
    if line['text'] == 'KEEPING IT COOL':
        runs = runs[1:-1]  # the two rules either side are drawn separately
    assert len(runs) == len(chars), (line['text'], len(runs), len(chars))
    cap_px = line['cap'][1] - line['cap'][0] + 1
    size = cap_px / (CAP_UNITS / UPEM)  # px per em
    baseline = line['cap'][1] + 1  # y of the baseline (raster rows are inclusive)
    w = line['weight']
    f = font_at(w)
    gs = f.getGlyphSet()
    els = []
    err = 0
    accents = line.get('accents', {})
    for ch, r in zip(chars, runs):
        b = glyph_bounds(f, ch)
        gw = (b[2] - b[0]) * size / UPEM
        err += abs(gw - (r['x1'] - r['x0'] + 1))
        xs = (r['x1'] - r['x0'] + 1) / gw  # per-glyph horizontal fit to the artwork
        xs = min(max(xs, 0.9), 1.1)
        s = size / UPEM
        pen = SVGPathPen(gs, ntos=lambda v: f'{v:.1f}'.rstrip('0').rstrip('.'))
        tp = TransformPen(pen, (s * xs, 0, 0, -s, r['x0'] - b[0] * s * xs, baseline))
        gs[f.getBestCmap()[ord(ch)]].draw(tp)
        fill = f' fill="{accents[ch]}"' if ch in accents else ''
        els.append(f'<path{fill} d="{pen.getCommands()}"/>')
    return els, w, err


# ---------- the mark: trace the three colour layers at 4x ----------
def bezier_path(path, scale):
    d = []
    for curve in path:
        sp = curve.start_point
        d.append(f'M{sp.x / scale:.2f} {sp.y / scale:.2f}')
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f'L{seg.c.x / scale:.2f} {seg.c.y / scale:.2f}L{seg.end_point.x / scale:.2f} {seg.end_point.y / scale:.2f}')
            else:
                d.append(f'C{seg.c1.x / scale:.2f} {seg.c1.y / scale:.2f} {seg.c2.x / scale:.2f} {seg.c2.y / scale:.2f} {seg.end_point.x / scale:.2f} {seg.end_point.y / scale:.2f}')
        d.append('Z')
    return ''.join(d)


def refine_polygon(c, ap):
    """Refine approxPolyDP vertices: fit a straight line to the contour points along each edge
    and intersect neighbouring lines, so the polygon's sides are truly straight."""
    pts = c.reshape(-1, 2).astype(np.float64)
    n = len(pts)
    idx = [int(np.argmin(((pts - v) ** 2).sum(1))) for v in ap.reshape(-1, 2)]
    k = len(idx)
    lines = []
    for i in range(k):
        a, b = idx[i], idx[(i + 1) % k]
        seg = pts[a:b + 1] if b >= a else np.vstack([pts[a:], pts[:b + 1]])
        m = max(2, len(seg) // 8)  # keep clear of the rounded corners
        core = seg[m:-m] if len(seg) > 2 * m + 2 else seg
        vx, vy, x0, y0 = cv2.fitLine(core.astype(np.float32), cv2.DIST_L2, 0, 0.01, 0.01).ravel()
        lines.append((vx, vy, x0, y0))
    out = []
    for i in range(k):
        (vx1, vy1, x1, y1), (vx2, vy2, x2, y2) = lines[i - 1], lines[i]
        den = vx1 * vy2 - vy1 * vx2
        if abs(den) < 1e-6:
            out.append(pts[idx[i]])
            continue
        t = ((x2 - x1) * vy2 - (y2 - y1) * vx2) / den
        out.append((x1 + t * vx1, y1 + t * vy1))
    return np.array(out)


def trace_layer(mask_bool, scale=4):
    """Straight-sided pieces (the chevrons) become exact polygons; curved pieces (the waves)
    are potrace-fitted Béziers. Both from a 4x, edge-smoothed copy of the raster."""
    m = mask_bool.astype(np.float32)
    up = cv2.resize(m, (m.shape[1] * scale, m.shape[0] * scale), interpolation=cv2.INTER_CUBIC)
    up = cv2.GaussianBlur(up, (0, 0), 2.6)
    binm = (up > 0.5).astype(np.uint8)
    n, lab = cv2.connectedComponents(binm, connectivity=8)
    d = []
    for i in range(1, n):
        comp = (lab == i).astype(np.uint8)
        if comp.sum() < 12 * scale * scale:
            continue
        cnts, hier = cv2.findContours(comp, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
        polys = []
        straight = True
        for c in cnts:
            ap = cv2.approxPolyDP(c, 3.0 * scale, True)
            area_c, area_p = abs(cv2.contourArea(c)), abs(cv2.contourArea(ap))
            if len(ap) > 8 or area_c == 0 or abs(area_p - area_c) / area_c > 0.05:
                straight = False
                break
            polys.append(refine_polygon(c, ap))
        if straight:
            for pts in polys:
                pts = pts / scale
                d.append('M' + 'L'.join(f'{x:.2f} {y:.2f}' for x, y in pts) + 'Z')
        else:
            bm = potrace.Bitmap(~(comp > 0))  # potracer: 0 = ink
            path = bm.trace(turdsize=12, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.6)
            d.append(bezier_path(path, scale))
    return ''.join(d)


MARK_ROWS = (0, 540)
mark_region = np.zeros_like(op)
mark_region[MARK_ROWS[0]:MARK_ROWS[1]] = True
layers = []
for i, (name, col) in enumerate([('navy', NAVY), ('orange', ORANGE), ('blue', BLUE)]):
    mask = op & (cls == i) & mark_region
    # tidy the raster edge: small opening removes cut-out fringe specks
    mask = cv2.morphologyEx(mask.astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)) > 0
    layers.append((col, trace_layer(mask)))

# ---------- rules either side of the slogan ----------
slog = runs_in(847, 874)
rules = [slog[0], slog[-1]]

# ---------- assemble ----------
def build(reverse=False):
    text_col = '#ffffff' if reverse else NAVY
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Coletrup Cooling — Air Conditioning | Refrigeration — Keeping It Cool">']
    for col, d in layers:
        c = text_col if (reverse and col == NAVY) else col
        parts.append(f'<path fill="{c}" fill-rule="evenodd" d="{d}"/>')
    report = []
    for line in LINES:
        els, w, err = line_paths(line)
        col = text_col if (reverse and line['colour'] == NAVY) else line['colour']
        parts.append(f'<g fill="{col}">' + ''.join(els) + '</g>')
        report.append((line['text'], w, round(err, 1)))
    for r in rules:
        parts.append(f'<rect fill="{text_col}" x="{r["x0"]}" y="{r["y0"]}" width="{r["x1"] - r["x0"] + 1}" height="{r["y1"] - r["y0"] + 1}" rx="1.5"/>')
    parts.append('</svg>')
    return '\n'.join(parts), report


svg, report = build(False)
open('public/brand/coletrup-cooling-logo.svg', 'w').write(svg)
svg_rev, _ = build(True)
open('public/brand/coletrup-cooling-logo-reversed.svg', 'w').write(svg_rev)

# mark only (favicons / app icons): tight square viewBox around the traced mark
ys, xs = np.where(op & mark_region)
mx0, mx1, my0, my1 = xs.min(), xs.max(), ys.min(), ys.max()
side = max(mx1 - mx0, my1 - my0) + 24
cx, cy = (mx0 + mx1) / 2, (my0 + my1) / 2
mark_svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{cx - side / 2:.1f} {cy - side / 2:.1f} {side:.1f} {side:.1f}" width="512" height="512" role="img" aria-label="Coletrup Cooling">']
for col, d in layers:
    mark_svg.append(f'<path fill="{col}" fill-rule="evenodd" d="{d}"/>')
mark_svg.append('</svg>')
open('public/brand/coletrup-cooling-mark.svg', 'w').write('\n'.join(mark_svg))
print('weights chosen:', report)
print('svg bytes', len(svg), 'mark svg bytes', len('\n'.join(mark_svg)))
