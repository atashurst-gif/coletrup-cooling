"""Remove the sleeve logo from the office filter-clean photo (keeps everything else as supplied)."""
import sys, cv2, numpy as np
sys.argv = ['x']
exec(open('tools/clean-photos.py').read().split("if __name__ == '__main__':")[0])  # reuse the mask/fill helpers

SRC = 'tools/photo-originals/branded/engineer-cleaning-ceiling-cassette-air-conditioning-filter-office.jpg'
OUTP = 'tools/photo-originals/branded/engineer-cleaning-ceiling-cassette-air-conditioning-filter-office-no-sleeve-logo.jpg'
img = cv2.imread(SRC)
poly = poly_mask(img.shape, [(955, 558), (1096, 558), (1096, 674), (955, 674)])
m = garment_mask(img, poly, dilate=6)
rec = fill(img, m, 'biharmonic')
rec = flatten_chroma(rec, m)
out = regrain(rec, img, m)
cv2.imwrite(OUTP, out, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('out/_sleeve_mask.png', m)
crop = np.hstack([img[520:700, 920:1130], cv2.cvtColor(m[520:700, 920:1130], cv2.COLOR_GRAY2BGR), out[520:700, 920:1130]])
cv2.imwrite('out/_sleeve_after.png', cv2.resize(crop, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC))
print('mask px', int((m > 0).sum()))
