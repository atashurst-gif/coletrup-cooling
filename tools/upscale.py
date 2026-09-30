"""2x super-resolution (EDSR via OpenCV dnn_superres) for the small supplied photos.
Run with the pinned venv: /home/claude/.sr-venv/bin/python tools/upscale.py in.jpg out.jpg
"""
import sys, time, cv2
sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel('tools/models/EDSR_x2.pb'); sr.setModel('edsr', 2)
src, dst = sys.argv[1], sys.argv[2]
img = cv2.imread(src); t = time.time()
up = sr.upsample(img)
cv2.imwrite(dst, up, [cv2.IMWRITE_JPEG_QUALITY, 94])
print(src, img.shape, '->', up.shape, f'{time.time()-t:.1f}s')
