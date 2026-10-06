import json
from pathlib import Path
from PIL import Image
from datetime import datetime, timezone

out=Path(__file__).resolve().parent
raw=[]
for p in out.glob('capture-modern*-raw.json'):
    raw.extend(json.loads(p.read_text()))
by_path={r.get('capturePath'):r for r in sorted(raw,key=lambda x:x.get('captureDate','')) if r.get('capturePath')}
access_date='2026-10-06'

def example(style,case_id,name,filename,url,caption,kind='live-site-screenshot',**extra):
    p=out/filename
    with Image.open(p) as im:w,h=im.size
    r=by_path.get(str(p),{})
    d=dict(style=style,caseId=case_id,name=name,url=url,caption=caption,date=access_date,
           kind=kind,capturePath=str(p),width=w,height=h,viewport=r.get('viewport'),
           captureDate=r.get('captureDate'),verified=True,verification='Primary site browsed; image visually inspected',
           visualAttribution='Interpretazione dei tratti visivi presenti, non dichiarazione dello stile da parte del marchio.')
    if r.get('cookieAction'):d['cookieAction']=r['cookieAction']
    d.update(extra)
    return d

glass=[
example('glass','windows11-start','Windows 11 · Start','glass-windows11-start-2021.png','https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/','Windows 11, menu Start, 2021. Screenshot ufficiale Microsoft: pannello traslucido sopra il desktop.','official-press-interface-screenshot',publishedDate='2021-06-24',assetUrl='https://blogs.windows.com/wp-content/uploads/prod/sites/2/2021/06/WIN_Start_GenZ_Light_16x10_en-US.png'),
example('glass','visionos-appstore','visionOS · App Store','glass-visionos-app-store.jpg','https://www.apple.com/apple-vision-pro/','App Store in visionOS. Immagine ufficiale Apple: finestra, controlli e navigazione separati dall’ambiente.','official-product-interface-image',assetUrl='https://www.apple.com/v/apple-vision-pro/l/images/overview/experiences/apps/drawer/app_store__ge30nsef8xui_large.jpg'),
example('glass','apple-music','Apple Music · desktop','glass-apple-music-clean-desktop.png','https://music.apple.com/us/new','Apple Music sul web, vista desktop. Il player flottante sfoca e lascia percepire il contenuto sottostante. Screenshot: 6 ottobre 2026.'),
example('glass','apple-music','Apple Music · finestra verticale','glass-apple-music-tablet-tablet.png','https://music.apple.com/us/new','Apple Music sul web, finestra verticale. Il materiale del player cambia aspetto secondo il fondo. Screenshot: 6 ottobre 2026.'),
]
minimal=[
example('minimal','studio-yoke','Studio Yoke · desktop','minimal-studio-yoke-desktop.png','https://www.studioyoke.co.uk/','Studio Yoke, homepage desktop. Palette binaria, tipografia e spazio negativo costruiscono la gerarchia. Screenshot: 6 ottobre 2026.'),
example('minimal','studio-yoke','Studio Yoke · mobile','minimal-studio-yoke-mobile.png','https://www.studioyoke.co.uk/','Studio Yoke, homepage mobile. Il logotipo cambia orientamento, mantenendo la composizione essenziale. Screenshot: 6 ottobre 2026.'),
example('minimal','apple','Apple · homepage','minimal-apple-clean-desktop.png','https://www.apple.com/','Apple, homepage. Il prodotto domina una sezione con pochi messaggi e due azioni principali. Screenshot: 6 ottobre 2026.'),
example('minimal','kinfolk','Kinfolk · homepage','minimal-kinfolk-desktop.png','https://www.kinfolk.com/','Kinfolk, homepage. Margini ampi, una copertina e gerarchie tipografiche limitano gli elementi concorrenti. Screenshot: 6 ottobre 2026.'),
]
y2k=[
example('y2k','girls-who-code-girls','Girls Who Code Girls · campagna 2022','y2k-girls-who-code-2022-archival.webp','https://www.girlswhocodegirls.com/','Girls Who Code Girls, campagna avviata nel 2022. Screenshot dell’interfaccia dal materiale didattico: cromature e futurismo pop.','archived-live-interface-screenshot',captureDate=None,campaignLaunchYear=2022,extractedFrom='materiali/lezioni/2025-2026/05-processo-ux-gestalt-storia-interfacce.pdf',pdfPage=108,primaryVerificationUrl='https://girlswhocode.com/2022report/downloads/GWC_2022_Annual_Report.pdf',verification='Primary site remains live; official 2022 annual report confirms released desktop/mobile coding experience. 2022 is the campaign launch year, not an asserted screenshot capture date. Screenshot extracted from course PDF, not newly generated.'),
example('y2k','bratz','Bratz · desktop','y2k-bratz-desktop.png','https://www.bratz.com/','Bratz, homepage desktop. Immaginario pop digitale, colori freddi e tipografia espansa. Screenshot: 6 ottobre 2026.'),
example('y2k','bratz','Bratz · mobile','y2k-bratz-mobile.png','https://www.bratz.com/','Bratz, homepage mobile. Lo stesso immaginario pop si adatta a uno schermo verticale. Screenshot: 6 ottobre 2026.'),
example('y2k','camerons-world','Cameron’s World · collage','y2k-camerons-world-desktop.png','https://www.cameronsworld.net/','Cameron’s World. Collage di materiali GeoCities del 1994–2009: GIF, pixel e decorazione digitale. Screenshot: 6 ottobre 2026.',contextNote='Contesto del revival retro-web: nostalgia delle pagine personali, distinta dal futurismo cromato Y2K. Non presentare questo sito contemporaneo come pagina originale del 2000.'),
]
maximal=[
example('max','one-all','ONE&ALL · 2019','max-one-all-2019-archival.webp','https://www.obergine.com/news-and-blog/2019/november-2019/maximalist-web-design','ONE&ALL, homepage del festival, 2019. Screenshot storico: pattern, lettere giganti e blocchi sovrapposti.','archived-live-interface-screenshot',captureDate=None,screenVersionYear=2019,originalUrl='http://oneandall.io/',extractedFrom='materiali/lezioni/2025-2026/05-processo-ux-gestalt-storia-interfacce.pdf',pdfPage=113,verification='Authentic 2019 site screenshot extracted from course PDF; corroborated by contemporaneous Obergine article (8 November 2019). Original domain unavailable, no designer attribution asserted.'),
example('max','toiletpaper','TOILETPAPER · desktop','max-toiletpaper-clean-desktop.png','https://www.toiletpapermagazine.org/','TOILETPAPER, homepage desktop. Fotomontaggio, colori saturi e sovrapposizioni danno ritmo alla pagina. Screenshot: 6 ottobre 2026.'),
example('max','toiletpaper','TOILETPAPER · mobile','max-toiletpaper-mobile-clean-mobile.png','https://www.toiletpapermagazine.org/','TOILETPAPER, homepage mobile. Il collage visivo continua nella colonna verticale. Screenshot: 6 ottobre 2026.'),
example('max','arngren','Arngren · catalogo','max-arngren-desktop.png','https://www.arngren.net/','Arngren, catalogo online. Immagini, prezzi e collegamenti si accumulano con alta densità. Screenshot: 6 ottobre 2026.',contextNote='Caso limite di accumulazione visiva per confronto, non prova che la densità garantisca qualità o usabilità; nessuna attribuzione intenzionale del termine massimalismo all’autore.'),
]
neo=[
example('neo','gumroad','Gumroad · desktop','neo-gumroad-desktop.png','https://gumroad.com/','Gumroad, homepage desktop. Contorni netti e illustrazioni a campiture piatte. Screenshot: 6 ottobre 2026.'),
example('neo','gumroad','Gumroad · mobile','neo-gumroad-mobile.png','https://gumroad.com/','Gumroad, homepage mobile. Titolo, azioni e bordi si adattano a una colonna. Screenshot: 6 ottobre 2026.'),
example('neo','panda-css','Panda CSS · homepage','neo-panda-css-desktop.png','https://panda-css.com/','Panda CSS, homepage. Giallo saturo, caratteri molto grandi e controlli delineati. Screenshot: 6 ottobre 2026.'),
example('neo','neobrutalism-components','Neobrutalism components · sito implementato','neo-neobrutalism-components-desktop.png','https://www.neobrutalism.dev/','Neobrutalism components, homepage. Griglia esposta, bordi neri e ombre dure spostate. Screenshot: 6 ottobre 2026.',contextNote='Screenshot dell’interfaccia del sito realmente implementato di una libreria open source; non screenshot di un mockup o di un componente inventato.'),
]
styles=[dict(style=s,title=t,examples=es) for s,t,es in [('glass','Glassmorfismo',glass),('minimal','Minimalismo',minimal),('y2k','Y2K e revival retro-web',y2k),('max','Massimalismo',maximal),('neo','Neobrutalismo',neo)]]
for s in styles:
    assert len(s['examples'])==4
    assert len({e['caseId'] for e in s['examples']})>=3
    for e in s['examples']: assert Path(e['capturePath']).exists()
data=dict(createdAt=datetime.now(timezone.utc).isoformat(),accessDate=access_date,timezone='Europe/Rome',
          scope='Authentic example assets only; no Figma or slide mutations.',styles=styles,
          qualityChecks=dict(selectedImages=20,styles=5,minimumDistinctCasesPerStyle=3,allImagesVisuallyInspected=True,
                             allImagesOriginalOrLiveCapture=True,noAiImages=True,noSiteStyleModifications=True),
          excluded=['LINGsCARS: anti-bot 403, excluded','Bear Blog: browser 404, excluded','MUJI: HTTP/2 failure, excluded','Girls Who Code current intro partial frames: excluded; use authenticated archived full interface screenshot','PIN–UP: current composition has weak fit to maximalism; excluded from final selection','Bratz captures with cookie banner: overwritten using optional cookies No defaults, then re-inspected'],
          alternatives=[dict(name='Poolsuite',capturePath=str(out/'y2k-poolsuite-desktop.png'),url='https://poolsuite.net/',note='Actual retro GUI/music interface, but 1980s/1990s desktop nostalgia is not the same as metallic Y2K futurism; not selected for the Y2K spread.'),dict(name='Fluent Acrylic',capturePath=str(out/'glass-fluent-acrylic-official.png'),url='https://fluent2.microsoft.design/material',note='Official material usage example; label official example rather than actual application screenshot.'),dict(name='Windows Widgets',capturePath=str(out/'glass-windows11-widgets-2021.png'),url='https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/',note='Official implemented system interface image, 2021.'),dict(name='macOS Liquid Glass',capturePath=str(out/'glass-macos-liquid-glass-2025.jpg'),url='https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/',note='Official implemented operating-system interface, 2025.')])
(out/'modern-examples.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(dict(path=str(out/'modern-examples.json'),selectedImages=20,styles=5),ensure_ascii=False))
