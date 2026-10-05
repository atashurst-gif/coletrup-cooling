# Packs the 16/32/48 px favicon PNGs (made by tools/make-favicon.mjs) into public/favicon.ico
from PIL import Image
import os
root = os.path.join(os.path.dirname(__file__), '..', 'public')
ims = [Image.open(os.path.join(root, f'favicon-{s}.png')).convert('RGBA') for s in (48, 32, 16)]
ims[0].save(os.path.join(root, 'favicon.ico'), format='ICO', sizes=[(48, 48), (32, 32), (16, 16)], append_images=ims[1:])
print('wrote favicon.ico', [i.size for i in ims])
