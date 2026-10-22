"""Original early-web GIF graphics. No imported artwork or fonts.

This script draws a small geometric coffee cup, its rising steam, and a
twinkling NEW label; it exports real animated GIF89a files plus still frames
for reduced-motion and print. They are revival assets, not historical finds.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

out = Path(__file__).parent
font = ImageFont.load_default()
frames = []
for step in range(8):
    im = Image.new('RGB', (104, 58), '#ffffdf')
    d = ImageDraw.Draw(im)
    d.ellipse((5, 44, 66, 53), fill='#a0a0a0', outline='#000000')
    d.ellipse((7, 40, 64, 49), fill='#ffffff', outline='#000000')
    d.ellipse((51, 22, 67, 39), fill='#eeeeee', outline='#000000', width=2)
    d.ellipse((56, 25, 64, 34), fill='#ffffdf', outline='#000000')
    d.rounded_rectangle((14, 22, 54, 43), radius=7, fill='#eeeeee', outline='#000000', width=2)
    d.ellipse((14, 19, 54, 28), fill='#582b13', outline='#000000', width=2)
    d.arc((17, 24, 24, 39), 70, 250, fill='#ffffff', width=2)
    for x in (23, 34, 45):
        y = 18 - (step % 4) * 2
        d.line([(x, y), (x + 3, y - 4), (x - 1, y - 8), (x + 2, y - 11)], fill='#808080', width=1)
    d.text((73, 20), 'TTC', font=font, fill='#800000')
    d.text((70, 33), 'caffè', font=font, fill='#000000')
    frames.append(im)
frames[0].save(out / 'coffee-still.png')
frames[0].save(out / 'coffee-steam.gif', save_all=True, append_images=frames[1:], duration=220, loop=0, optimize=False)

frames = []
for step in range(6):
    im = Image.new('RGB', (54, 24), '#ffffdf')
    d = ImageDraw.Draw(im)
    d.text((14, 7), 'NEW', font=font, fill='#cc0000')
    for x, y in ((5, 6), (47, 17)):
        span = 2 + step % 3
        d.line((x - span, y, x + span, y), fill='#0000ff')
        d.line((x, y - span, x, y + span), fill='#0000ff')
    frames.append(im)
frames[0].save(out / 'new-still.png')
frames[0].save(out / 'new.gif', save_all=True, append_images=frames[1:], duration=250, loop=0, optimize=False)
