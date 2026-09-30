// Screenshot the areas map before and after its animation: node tools/snap-map.mjs <path> <width>
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mjs':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.json':'application/json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4323,r));
const [,, path='/areas-we-cover/', width='1440'] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:+width, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4323'+path, { waitUntil:'networkidle' });
const el = page.locator('[data-ukmap]').first();
// state 0: before it comes into view (scroll so the map is just below the fold)
await page.evaluate(()=>{ document.documentElement.style.scrollBehavior='auto'; });
await el.screenshot({ path: 'out/_map_0.png' });
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(6000);
await el.screenshot({ path: 'out/_map_3.png' });
// initial (whole-UK) state: reverse the animation and wait for it to settle
await el.evaluate(e=>e.classList.remove('is-live'));
await page.waitForTimeout(3500);
await el.screenshot({ path: 'out/_map_1.png' });
await el.evaluate(e=>e.classList.add('is-live'));
await page.waitForTimeout(1500);
await el.screenshot({ path: 'out/_map_2.png' });
const live = await el.evaluate(e=>e.classList.contains('is-live'));
console.log('is-live', live);
await browser.close(); srv.close();
