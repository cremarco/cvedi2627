import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('assets/booklet/capitolo-2/atlante-stili/reali/modern');
const entries=[
{name:'glass-windows11-start-2021.png',url:'https://blogs.windows.com/wp-content/uploads/prod/sites/2/2021/06/WIN_Start_GenZ_Light_16x10_en-US.png'},
{name:'glass-windows11-widgets-2021.png',url:'https://blogs.windows.com/wp-content/uploads/prod/sites/2/2021/06/WIN_Widgets_Light-Theme_16x9_en-US-1.png'},
{name:'glass-visionos-app-store.jpg',url:'https://www.apple.com/v/apple-vision-pro/l/images/overview/experiences/apps/drawer/app_store__ge30nsef8xui_large.jpg'},
{name:'glass-macos-liquid-glass-2025.jpg',url:'https://www.apple.com/newsroom/images/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/article/Apple-WWDC25-Liquid-Glass-Home-Screen-clear-look-250609_big.jpg.large.jpg'},
];
for(const e of entries){try{const r=await fetch(e.url);if(!r.ok)throw new Error('HTTP '+r.status);const data=Buffer.from(await r.arrayBuffer());e.path=path.join(out,e.name);e.mime=r.headers.get('content-type');await fs.writeFile(e.path,data);e.bytes=data.length;e.accessedAt=new Date().toISOString();console.log(JSON.stringify(e));}catch(error){e.error=String(error);console.log(JSON.stringify(e));}}
await fs.copyFile('assets/booklet/capitolo-2/fluent-acrylic.png',path.join(out,'glass-fluent-acrylic-official.png'));
await fs.copyFile('public/images/storia-design/massimalismo.webp',path.join(out,'max-one-all-2019-archival.webp'));
await fs.copyFile('public/images/storia-design/y2k.webp',path.join(out,'y2k-girls-who-code-2022-archival.webp'));
await fs.writeFile(path.join(out,'official-downloads.json'),JSON.stringify(entries,null,2));
