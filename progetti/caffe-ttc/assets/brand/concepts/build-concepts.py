from pathlib import Path
ROOT=Path(__file__).resolve().parent
symbols={
'banco': '<path d="M24 32H112V64H84V96H52V64H24Z M128 32H224V64H192V96H160V64H128Z M224 112H112A64 64 0 0 0 112 240H224V208H112A32 32 0 0 1 112 144H224Z"/>',
'incontro': '<path d="M112 48H104A80 80 0 0 0 104 208H112V176H104A48 48 0 0 1 104 80H112Z M144 48H152A80 80 0 0 1 152 208H144V176H152A48 48 0 0 0 152 80H144Z"/><circle cx="128" cy="128" r="24"/>',
'soglia': '<path d="M32 32H208L232 56V88H192V72H72V184H192V168H232V200L208 224H32Z M104 72H136V120H104Z M104 136H136V184H104Z"/>'
}
titles={'banco':'Banco TTC','incontro':'Incontro','soglia':'Soglia'}
# Original geometrical CAFFÈ lettering: fixed stems, optical spacing, outlined accent.
caffe='''<path d="M44 0H18A18 18 0 0 0 0 18V42A18 18 0 0 0 18 60H44V50H18A8 8 0 0 1 10 42V18A8 8 0 0 1 18 10H44Z"/>
<path fill-rule="evenodd" d="M70 0H82L104 60H93L88 46H64L59 60H48Z M68 36H84L76 14Z"/>
<path d="M114 0H154V10H124V26H150V36H124V60H114Z M167 0H207V10H177V26H203V36H177V60H167Z M220 0H260V10H230V25H256V35H230V50H260V60H220Z M232 -19H242L250 -7H240Z"/>'''
ttc_angular='<path d="M288 118H388V146H352V224H324V146H288Z M406 118H506V146H470V224H442V146H406Z M640 118H566A26 26 0 0 0 540 144V198A26 26 0 0 0 566 224H640V196H568V146H640Z"/>'
ttc_round='<path d="M288 118H380A12 12 0 0 1 380 142H346V210A14 14 0 0 1 318 210V142H288A12 12 0 0 1 288 118Z M410 118H502A12 12 0 0 1 502 142H468V210A14 14 0 0 1 440 210V142H410A12 12 0 0 1 410 118Z M630 118H584A53 53 0 0 0 584 224H630A12 12 0 0 0 630 200H584A29 29 0 0 1 584 142H630A12 12 0 0 0 630 118Z"/>'
ttc_serif='<path d="M288 118H390V142H380V130H353V214H367V224H311V214H325V130H298V142H288Z M408 118H510V142H500V130H473V214H487V224H431V214H445V130H418V142H408Z M638 118H630V126A58 58 0 0 0 540 172A58 58 0 0 0 638 214V198H626A35 35 0 0 1 570 172A35 35 0 0 1 626 143H638Z"/>'
for name, shapes in symbols.items():
    translate={'banco':'translate(4 -12)','incontro':'translate(0 0)','soglia':'translate(-4 -4)'}[name]
    body=f'<g id="symbol" fill="#000000" transform="{translate}">{shapes}</g>'
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-labelledby="title"><title id="title">Caffè TTC — {titles[name]}</title>{body}</svg>\n'
    (ROOT/f'{name}-symbol-v2.svg').write_text(svg)
    lettering=f'<g transform="translate(288 36) scale(.8)">{caffe}</g>'
    lettering+={'banco':ttc_angular,'incontro':ttc_round,'soglia':ttc_serif}[name]
    lockup=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 672 256" role="img" aria-labelledby="title"><title id="title">Caffè TTC — {titles[name]}, logo orizzontale</title>{body}<g id="wordmark" fill="#000000">{lettering}</g></svg>\n'
    (ROOT/f'{name}-lockup-v2.svg').write_text(lockup)
