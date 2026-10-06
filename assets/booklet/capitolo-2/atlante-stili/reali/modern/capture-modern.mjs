import { chromium } from 'playwright-chromium';
import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('assets/booklet/capitolo-2/atlante-stili/reali/modern');
await fs.mkdir(out,{recursive:true});
const baseCases=[
 ['neo','gumroad','https://gumroad.com/',['desktop','mobile']],
 ['neo','panda-css','https://panda-css.com/',['desktop']],
 ['neo','neobrutalism-components','https://www.neobrutalism.dev/',['desktop']],
 ['minimal','studio-yoke','https://www.studioyoke.co.uk/',['desktop','mobile']],
 ['minimal','bear-blog','https://bearblog.dev/',['desktop']],
 ['minimal','muji','https://www.muji.com/jp/ja/store',['desktop']],
 ['max','lingscars','https://www.lingscars.com/',['desktop','mobile']],
 ['max','toiletpaper','https://www.toiletpapermagazine.org/',['desktop']],
 ['y2k','camerons-world','https://www.cameronsworld.net/',['desktop','mobile']],
 ['y2k','poolsuite','https://poolsuite.net/',['desktop']],
 ['glass','apple-music','https://music.apple.com/us/new',['desktop','mobile']],
];
const extraCases=[
 ['minimal','apple','https://www.apple.com/',['desktop']],
 ['minimal','kinfolk','https://www.kinfolk.com/',['desktop']],
 ['max','pin-up','https://www.pinupmagazine.org/',['desktop','mobile']],
 ['max','toiletpaper-clean','https://www.toiletpapermagazine.org/',['desktop']],
 ['y2k','girls-who-code-girls','https://www.girlswhocodegirls.com/',['desktop','mobile']],
 ['glass','apple-music-clean','https://music.apple.com/us/new',['desktop']],
];
const finalCases=[
 ['max','arngren','https://www.arngren.net/',['desktop']],
 ['max','toiletpaper-mobile-clean','https://www.toiletpapermagazine.org/',['mobile']],
 ['y2k','girls-who-code-creator','https://www.girlswhocodegirls.com/',['mobile']],
 ['minimal','apple-clean','https://www.apple.com/',['desktop']],
];
const supplementalCases=[
 ['y2k','bratz','https://www.bratz.com/',['desktop','mobile']],
 ['glass','apple-music-tablet','https://music.apple.com/us/new',['tablet']],
];
const cases=process.argv[2]==='bratz'?supplementalCases.filter(x=>x[1]==='bratz'):process.argv[2]==='extra'?extraCases:process.argv[2]==='final'?finalCases:process.argv[2]==='supplement'?supplementalCases:baseCases;
const browser=await chromium.launch({headless:true});
const records=[];
try {
 for(const [style,name,url,views] of cases){
  for(const view of views){
   const viewport=view==='mobile'?{width:480,height:760}:view==='tablet'?{width:1000,height:1250}:{width:1440,height:900};
   const page=await browser.newPage({viewport,deviceScaleFactor:1,locale:'en-US',colorScheme:'light'});
   const record={style,name,url,view,viewport,captureDate:new Date().toISOString(),kind:'live-site-screenshot'};
   try{
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForTimeout(4500);
    await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,2000))]));
    const labels=['Reject','Reject all','Reject All','Decline all','Decline All','Only necessary cookies','Accept necessary cookies','No thanks','Reject cookies','Rifiuta tutti','Continue without accepting'];
    for(const label of labels){
      const b=page.getByRole('button',{name:label,exact:true});
      if(await b.count() && await b.first().isVisible()){await b.first().click({timeout:2500}).catch(()=>{}); record.cookieAction=label; break;}
    }
    if(name==='bratz'){
      for(const frame of page.frames()){
        const submit=frame.getByText('SUBMIT ALL PREFERENCES',{exact:true});
        if(await submit.count()&&await submit.first().isVisible()){
          await submit.first().click({timeout:5000});record.cookieAction='Submit all preferences; optional Functional and Advertising cookies set to No (site defaults)';await page.waitForTimeout(900);break;
        }
      }
    }
    if(name==='apple-music-clean'||name==='apple-clean'||name==='apple-music-tablet'){
      const close=page.getByRole('button',{name:/^Close$|Chiudi|Dismiss/i});
      for(let j=0;j<await close.count();j++){if(await close.nth(j).isVisible())await close.nth(j).click({timeout:2500}).catch(()=>{});}
    }
    if(name==='girls-who-code-creator'){
      const skip=page.getByText('SKIP',{exact:true});
      if(await skip.count()&&await skip.first().isVisible()){await skip.first().click({timeout:3000});record.siteAction='SKIP introductory animation';await page.waitForTimeout(14000);}
    }
    await page.waitForTimeout(900);
    record.httpStatus=response?.status(); record.finalUrl=page.url(); record.title=await page.title();
    record.capturePath=path.join(out,`${style}-${name}-${view}.png`);
    await page.screenshot({path:record.capturePath,type:'png',animations:'disabled'});
    record.pageText=(await page.locator('body').innerText()).slice(0,500);
    console.log(JSON.stringify({name,view,status:record.httpStatus,title:record.title,path:record.capturePath}));
   }catch(error){record.error=String(error);console.log(JSON.stringify({name,view,error:record.error}));}
   records.push(record); await page.close();
   await fs.writeFile(path.join(out,process.argv[2]==='bratz'?'capture-modern-bratz-raw.json':process.argv[2]==='extra'?'capture-modern-extra-raw.json':process.argv[2]==='final'?'capture-modern-final-raw.json':process.argv[2]==='supplement'?'capture-modern-supplement-raw.json':'capture-modern-raw.json'),JSON.stringify(records,null,2));
  }
 }
}finally{await browser.close();}
