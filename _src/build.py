import pathlib
S=pathlib.Path('src'); css=(S/'engine.css').read_text(); js=(S/'engine.js').read_text()
T='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{t}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,600;1,700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>{css}</style></head><body><script>{data}</script><script>{js}</script></body></html>'''
for slug,t in [('body-parts','Parts of the Body'),('aches-and-pains','Aches & Pains')]:
    out=pathlib.Path('health')/slug; out.mkdir(parents=True,exist_ok=True)
    (out/'index.html').write_text(T.format(t=t,css=css,data=(S/f'{slug}.js').read_text(),js=js))
print('ok')
