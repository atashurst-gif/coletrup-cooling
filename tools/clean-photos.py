"""Remove the placeholder logo marks from the four supplied photos so they carry NO logo.

Reads the untouched originals in tools/photo-originals/, classifies the printed mark by
colour inside a hand-drawn polygon (so walls, windows and edges are never touched),
reconstructs the underlying surface, then re-grains the patch to match the JPEG texture.

Outputs: out/clean-photos/<name>.jpg; tools/upscale.py then makes the 2x versions used in src/assets/images.
Run with --sheet to also write a before/mask/after contact sheet for checking.
"""
import os, sys, cv2, numpy as np
from skimage.restoration import inpaint_biharmonic

SRC = 'tools/photo-originals/'
OUT = 'out/clean-photos/'
os.makedirs(OUT, exist_ok=True)
K = lambda n: np.ones((n, n), np.uint8)


def poly_mask(shape, pts):
    m = np.zeros(shape[:2], np.uint8)
    cv2.fillPoly(m, [np.array(pts, np.int32)], 255)
    return m


def garment_mask(img, poly, dilate=5):
    """Logo print on a dark navy garment: white, orange or light-blue ink (not the fabric)."""
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    H, S, V = hsv[..., 0].astype(int), hsv[..., 1].astype(int), hsv[..., 2].astype(int)
    white = (V > 135) & (S < 95)
    orange = (H < 28) & (S > 90) & (V > 95)
    light_blue = (H >= 88) & (H <= 112) & (S > 100) & (V > 125)
    m = ((white | orange | light_blue) & (poly > 0)).astype(np.uint8) * 255
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, K(5))
    m = cv2.dilate(m, K(dilate * 2 + 1))
    return m & poly


def panel_mask(img, poly, sat=40, val=178, dilate=6, keep=None):
    """Logo print on a white van panel: anything saturated or dark (JPEG chroma halos need a wide dilate)."""
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    m = (((hsv[..., 1] > sat) | (hsv[..., 2] < val)) & (poly > 0)).astype(np.uint8) * 255
    if keep is not None:
        m &= ~keep
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, K(7))
    m = cv2.dilate(m, K(dilate * 2 + 1))
    if keep is not None:
        m &= ~cv2.dilate(keep, K(3))
    return m & poly


def flatten_chroma(rec, mask, sigma=5):
    """Inside the patch keep the reconstructed shading (L) but take chroma from the surrounding
    fabric/panel, so JPEG colour fringes from the old print can't tint the fill."""
    lab = cv2.cvtColor(rec, cv2.COLOR_BGR2LAB).astype(np.float32)
    ring = cv2.dilate(mask, K(21)) & ~mask
    med = np.median(lab[ring > 0][:, 1:], axis=0)
    ab = lab[..., 1:].copy()
    ab[mask > 0] = med
    ab = cv2.GaussianBlur(ab, (0, 0), sigma)
    lab[..., 1:][mask > 0] = ab[mask > 0]
    return cv2.cvtColor(np.clip(lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)


def regrain(clean, orig, mask, scale=1.0):
    """Add grain to the reconstructed area matching the residual noise around it."""
    resid = orig.astype(np.float32) - cv2.GaussianBlur(orig, (0, 0), 1.2).astype(np.float32)
    band = cv2.dilate(mask, K(31)) & ~mask
    r = resid[band > 0] if (band > 0).any() else np.zeros((1, 3))
    sd = np.minimum(1.4826 * np.median(np.abs(r - np.median(r, axis=0)), axis=0), 5.0)
    # monochrome grain (no chroma speckle), matched to the local luminance noise level
    lum = np.random.default_rng(7).normal(0, 1, clean.shape[:2]).astype(np.float32) * float(sd.mean()) * scale
    lum = cv2.GaussianBlur(lum, (0, 0), 0.6)
    noise = np.repeat(lum[..., None], 3, axis=2)
    out = clean.astype(np.float32) + noise * (mask[..., None] / 255.0)
    return np.clip(out, 0, 255).astype(np.uint8)


def fill(img, mask, method):
    if method == 'biharmonic':
        rec = inpaint_biharmonic(img, mask > 0, channel_axis=-1)
        return (rec * 255).astype(np.uint8)
    if method == 'ns':
        return cv2.inpaint(img, mask, 6, cv2.INPAINT_NS)
    if method == 'telea':
        return cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)
    if method == 'shiftmap':
        dst = np.zeros_like(img)
        cv2.xphoto.inpaint(img, (mask == 0).astype(np.uint8), dst, cv2.xphoto.INPAINT_SHIFTMAP)
        return dst
    if method == 'fsr':
        dst = np.zeros_like(img)
        cv2.xphoto.inpaint(img, (mask == 0).astype(np.uint8), dst, cv2.xphoto.INPAINT_FSR_BEST)
        return dst
    raise ValueError(method)


def blend_smooth(img, mask, methods=('biharmonic', 'ns')):
    """Average a smooth fill (biharmonic) with an isophote fill (NS): smooth shading, fewer streaks."""
    outs = [fill(img, mask, m).astype(np.float32) for m in methods]
    rec = sum(outs) / len(outs)
    return np.clip(rec, 0, 255).astype(np.uint8)


JOBS = {
    'coletrup-cooling-service-van.jpg': dict(
        kind='panel',
        poly=[(222, 66), (300, 62), (400, 74), (452, 80), (454, 200), (262, 200), (262, 176), (244, 176), (244, 156), (222, 156)],
        # the orange/blue livery swoosh is bright + saturated; the print is dark — keep the swoosh
        keep=lambda img: (lambda hsv: (((hsv[..., 1] > 110) & (hsv[..., 2] > 140)) & (np.arange(img.shape[1])[None, :] < 262) & (np.arange(img.shape[0])[:, None] > 152)).astype(np.uint8) * 255)(cv2.cvtColor(img, cv2.COLOR_BGR2HSV)),
        crop=(190, 30, 490, 230),
        # garbled graphic on the rear door: everything that isn't clean panel white, above the swoosh
        extra=[dict(poly=[(89, 72), (101, 72), (101, 104), (93, 118), (87, 130), (81, 142), (77, 152), (71, 152), (74, 135), (78, 120), (84, 100)], sat=25, val=190, dilate=2)],
    ),
    'commercial-air-conditioning-engineer-rooftop.jpg': dict(
        kind='garment',
        poly=[(318, 140), (432, 140), (432, 244), (318, 246)],
        crop=(280, 100, 470, 280),
        trim=(1, 0, 0, 0),
    ),
    'air-conditioning-engineer-servicing-home-unit.jpg': dict(
        kind='garment',
        # jacket only: keep clear of the bright wall/window on the left (x < ~62 at the bottom)
        poly=[(116, 252), (224, 252), (224, 402), (84, 402), (74, 380), (74, 330), (116, 300)],
        crop=(30, 220, 250, 402),
        trim=(0, 0, 7, 0),
    ),
    'engineer-refrigerant-gauges-diagnostics.jpg': dict(
        kind='garment',
        poly=[(110, 140), (172, 142), (172, 196), (160, 206), (110, 206)],
        crop=(80, 110, 210, 240),
        trim=(1, 0, 7, 0),
    ),
}

METHOD = {'panel': 'biharmonic', 'garment': 'biharmonic'}


def run(name, job, sheet=False):
    img = cv2.imread(SRC + name)
    poly = poly_mask(img.shape, job['poly'])
    if job['kind'] == 'panel':
        keep = job['keep'](img) if 'keep' in job else None
        m = panel_mask(img, poly, keep=keep)
    else:
        m = garment_mask(img, poly)
    for extra in job.get('extra', []):
        # secondary marks (e.g. the garbled graphic on the van's rear door)
        m |= panel_mask(img, poly_mask(img.shape, extra['poly']), sat=extra.get('sat', 40), val=extra.get('val', 178), dilate=extra.get('dilate', 3))
    method = METHOD[job['kind']]
    rec = blend_smooth(img, m) if method == 'blend' else fill(img, m, method)
    rec = flatten_chroma(rec, m)
    out = regrain(rec, img, m)
    # trim the thin white borders some of the supplied files carry (left, top, right, bottom)
    l, t, r, b = job.get('trim', (0, 0, 0, 0))
    out = out[t:out.shape[0] - b, l:out.shape[1] - r]
    cv2.imwrite(OUT + name, out, [cv2.IMWRITE_JPEG_QUALITY, 95])  # then: tools/upscale.py -> src/assets/images/
    if sheet:
        x0, y0, x1, y1 = job['crop']
        tiles = [img[y0:y1, x0:x1], cv2.cvtColor(m[y0:y1, x0:x1], cv2.COLOR_GRAY2BGR)]
        for meth in ('biharmonic', 'ns', 'telea', 'blend'):
            r = blend_smooth(img, m) if meth == 'blend' else fill(img, m, meth)
            tiles.append(regrain(flatten_chroma(r, m), img, m)[y0:y1, x0:x1])
        row = np.hstack(tiles)
        row = cv2.resize(row, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
        return row
    return None


if __name__ == '__main__':
    sheet = '--sheet' in sys.argv
    rows = []
    for name, job in JOBS.items():
        r = run(name, job, sheet)
        if r is not None:
            rows.append(r)
    if sheet:
        W = max(r.shape[1] for r in rows)
        rows = [cv2.copyMakeBorder(r, 0, 8, 0, W - r.shape[1], cv2.BORDER_CONSTANT, value=(40, 40, 40)) for r in rows]
        cv2.imwrite(OUT + '_sheet.jpg', np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 90])
    print('done')
