#!/usr/bin/env python3
"""
Generate grid thumbnails for the Gallery page.

The grid never renders a tile wider than about 430px, but the full photos are
1600-2000px — roughly fourteen times the bytes the tiles can use. This writes a
narrow JPEG copy of every photo in data/gallery-data.js into
assets/images/gallery/thumbs/, which the grid loads instead. The viewer still
opens the full-size file, so zoom quality is unaffected.

Re-run after adding photos:    python tools/make-gallery-thumbs.py
A photo with no thumbnail still works — the grid falls back to the full image.
"""
import os
import re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'images', 'gallery', 'thumbs')
WIDTH = 800          # 2x the widest tile, so it stays sharp on retina
QUALITY = 78

def main():
    data = open(os.path.join(ROOT, 'data', 'gallery-data.js'), encoding='utf-8').read()
    # only real entries, not the example in the header comment
    srcs = re.findall(r'^\s*src:\s*"\./([^"]+)"', data, re.M)

    os.makedirs(OUT, exist_ok=True)
    before = after = 0
    for rel in srcs:
        full = os.path.join(ROOT, rel)
        if not os.path.exists(full):
            print(f'  SKIP (missing) {rel}')
            continue
        name = os.path.splitext(os.path.basename(rel))[0] + '.jpg'
        dst = os.path.join(OUT, name)

        im = Image.open(full)
        w = min(WIDTH, im.width)
        h = round(im.height * w / im.width)
        im.convert('RGB').resize((w, h), Image.LANCZOS).save(
            dst, 'JPEG', quality=QUALITY, optimize=True, progressive=True)

        b, a = os.path.getsize(full), os.path.getsize(dst)
        before += b
        after += a
        print(f'  {os.path.basename(rel):38s} {b//1024:5d} KB -> {a//1024:4d} KB')

    # Thumbnails are generated artifacts, so anything here without a matching
    # entry is left over from a photo that was swapped out or removed.
    keep = {os.path.splitext(os.path.basename(r))[0] + '.jpg' for r in srcs}
    for f in sorted(os.listdir(OUT)):
        if f not in keep:
            os.remove(os.path.join(OUT, f))
            print(f'  removed stale thumbnail: {f}')

    print(f'\n  grid payload: {before//1024} KB -> {after//1024} KB '
          f'({100 - after*100//before}% smaller)')

if __name__ == '__main__':
    main()
