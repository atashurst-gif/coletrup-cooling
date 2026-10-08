"""Recolour brand-coloured decor (navy, orange) in the room photos, working in Lab colour space.
 - Navy soft furnishings / prints (inside green boxes) -> deep green: the a/b colour is rotated
   from blue to green; lightness (so texture, light and shade) is kept exactly.
 - Any other navy-ish blue (window/door frames, the office chair) -> neutral charcoal.
 - Orange / rust decor (inside orange boxes or outlines, because wood has the same colour)
   -> dusty rose, chosen by redness (Lab a*) so warm-lit cream and beige are left alone.
usage (from the project folder, with the image venv):
  /home/claude/.sr-venv/bin/python tools/recolour-rooms.py tools/photo-originals/rooms-brand-colours <out_dir> <preview_dir>
Then save each <out_dir>/<name>.png as src/assets/images/<site filename>.jpg (see the map at the bottom)."""
import sys, json, math, cv2, numpy as np
src, out, prev = sys.argv[1:4]

def smooth(x, a, b):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)

def shape_mask(shape, shapes, scale, feather):
    m = np.zeros(shape[:2], np.float32)
    for b in shapes:
        if isinstance(b[0], (tuple, list)):
            cv2.fillPoly(m, [np.array([[x * scale, y * scale] for x, y in b], np.int32)], 1.0)
        else:
            x0, y0, x1, y1 = b; m[int(y0*scale):int(y1*scale), int(x0*scale):int(x1*scale)] = 1
    return cv2.GaussianBlur(m, (0, 0), feather) if feather else m

def rotate_ab(a, b, deg, chroma=1.0):
    t = math.radians(deg); c, s = math.cos(t), math.sin(t)
    return (a * c - b * s) * chroma, (a * s + b * c) * chroma

# all coordinates in 640-px-wide sheet units
CFG = {
  'bedroom': dict(file='bedroom-wall-mounted-air-conditioning.jpg',
      green=[(0,8,42,312),(188,52,224,308),(222,268,560,470),(366,212,562,298),(396,84,624,196)],
      orange=[(383,243,484,294), [(219,368),(246,351),(342,351),(380,378),(305,401.25),(301.25,450),(300,481),(219,481)], (543,99,611,179)]),
  'living': dict(file='residential-air-conditioning-living-room-2x.jpg', green=[(262,272,352,352),(502,270,640,375)], orange=[(313,290,404,358)]),
  'office': dict(file='home-office-wall-mounted-air-conditioning.jpg',
      green=[(32,12,252,102),(279,102,330,212),(560,80,640,345)], orange=[(279,102,330,212),(90,220,128,264)]),
  'garden': dict(file='garden-room-home-office-air-conditioning.jpg', green=[], orange=[]),
  'kitchen': dict(file='kitchen-diner-wall-mounted-air-conditioning.jpg', green=[], orange=[]),
}
GREEN_ROT = 222      # degrees in the a/b plane: navy (about -80 deg) -> deep green (about 142 deg)
ROSE_ROT = -32       # rust (about 50 deg) -> dusty rose (about 18 deg)
stats = {}
for key, c in CFG.items():
    bgr = cv2.imread(f'{src}/{c["file"]}')
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB).astype(np.float32) / 255
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2Lab)
    L, A, B = lab[..., 0], lab[..., 1], lab[..., 2]
    scale = rgb.shape[1] / 640
    hue_ab = np.degrees(np.arctan2(B, A))            # -180..180
    chroma = np.hypot(A, B)
    # blue-ish: hue angle between about -130 and -40 (blue / navy), some chroma, not bright
    blue_hue = 1 - smooth(np.abs(hue_ab + 85), 40, 55)
    gbox = shape_mask(rgb.shape, c['green'], scale, 2.5 * scale) if c['green'] else np.zeros_like(L)
    navy_in = blue_hue * smooth(chroma, 1.5, 5) * (1 - smooth(L, 52, 64)) * gbox
    navy_out = blue_hue * smooth(chroma, 6, 12) * (1 - smooth(L, 40, 52)) * (1 - gbox)
    navy_in = cv2.GaussianBlur(navy_in, (0, 0), 0.7); navy_out = cv2.GaussianBlur(navy_out, (0, 0), 0.7)
    # orange / rust: red-orange hue angle (about 25..70), clearly red (a* high), inside the shapes
    obox = shape_mask(rgb.shape, c['orange'], scale, 1.2 * scale) if c['orange'] else np.zeros_like(L)
    orange = (1 - smooth(np.abs(hue_ab - 48), 24, 36)) * smooth(A, 12, 20) * obox
    orange = cv2.GaussianBlur(orange, (0, 0), 0.7)
    # targets
    ga, gb_ = rotate_ab(A, B, GREEN_ROT, 0.85); gL = np.clip(L * 1.06 + 2.5, 0, 100)
    ra, rb = rotate_ab(A, B, ROSE_ROT, 0.55); rL = np.clip(L + 4, 0, 100)
    green = np.dstack([gL, ga, gb_]); charcoal = np.dstack([L, A * 0.12, B * 0.12]); rose = np.dstack([rL, ra, rb])
    res = lab.copy()
    res = res * (1 - navy_in[..., None]) + green * navy_in[..., None]
    res = res * (1 - navy_out[..., None]) + charcoal * navy_out[..., None]
    res = res * (1 - orange[..., None]) + rose * orange[..., None]
    out_rgb = cv2.cvtColor(res.astype(np.float32), cv2.COLOR_Lab2RGB)
    out8 = (np.clip(out_rgb, 0, 1) * 255 + 0.5).astype(np.uint8)
    cv2.imwrite(f'{out}/{key}.png', cv2.cvtColor(out8, cv2.COLOR_RGB2BGR))
    p = rgb * 0.45; p[..., 1] += navy_in * 0.55; p[..., 2] += navy_out * 0.6; p[..., 0] += orange * 0.6; p[..., 2] += orange * 0.6
    cv2.imwrite(f'{prev}/{key}-mask.png', cv2.cvtColor((np.clip(p, 0, 1) * 255).astype(np.uint8), cv2.COLOR_RGB2BGR))
    stats[key] = {k: round(float((v > 0.5).mean()), 4) for k, v in (('navy_green', navy_in), ('navy_charcoal', navy_out), ('orange', orange))}
print(json.dumps(stats))

# site filenames: bedroom -> bedroom-wall-mounted-air-conditioning.jpg, living -> residential-air-conditioning-living-room.jpg,
# office -> home-office-wall-mounted-air-conditioning.jpg, garden -> garden-room-home-office-air-conditioning.jpg,
# kitchen -> kitchen-diner-wall-mounted-air-conditioning.jpg
