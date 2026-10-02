// Loads every page in Chromium and checks that every <img> actually decodes (catches broken/missing assets).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4322,r));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:1280, height:900 } });
const routes = ['/','/about/','/residential-air-conditioning/','/air-conditioning-installation/','/air-conditioning-repairs/','/air-conditioning-servicing-maintenance/','/commercial-air-conditioning/','/commercial-air-conditioning-repairs/','/commercial-air-conditioning-maintenance/','/refrigeration-repairs-maintenance/','/commercial-chiller-freezer-repairs/','/cellar-cooling-repairs-maintenance/','/cold-room-repairs-maintenance/','/display-fridge-repairs-maintenance/','/planned-maintenance-service-contracts/','/areas-we-cover/','/contact/'];
let bad = 0;
for (const r of routes) {
  await page.goto('http://localhost:4322'+r, { waitUntil:'networkidle' });
  // scroll slowly through the page so lazy images load
  await page.evaluate(async()=>{ const h=document.body.scrollHeight; for(let y=0;y<h;y+=600){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120)); } window.scrollTo(0,0); });
  await page.waitForLoadState('networkidle');
  const res = await page.evaluate(async()=>{ const imgs=[...document.querySelectorAll('img')]; imgs.forEach(i=>{ i.loading='eager'; }); await Promise.all(imgs.map(i=>i.decode().catch(()=>{}))); return imgs.map(i=>({src:(i.currentSrc||i.src).split('/').pop().slice(0,60), ok:i.complete && i.naturalWidth>0, w:i.naturalWidth})); });
  const failed = res.filter(x=>!x.ok);
  bad += failed.length;
  console.log(`${failed.length? '✘':'✔'} ${r} ${res.length} imgs${failed.length? ' FAILED: '+failed.map(f=>f.src).join(', '):''}`);
}
await browser.close(); srv.close();
process.exit(bad?1:0);
