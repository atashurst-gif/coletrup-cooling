// Open the mobile menu on an emulated phone and screenshot it: node tools/snap-menu.mjs [path]
import { chromium, devices } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.json':'application/json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4326,r));
const [,, path='/'] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const ctx = await browser.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('pageerror', e=>console.log('PAGEERROR', e.message));
await page.goto('http://localhost:4326'+path, { waitUntil:'networkidle' });
await page.screenshot({ path: 'out/_menu-closed.png' });
await page.tap('#burger'); await page.waitForTimeout(600);
const info = await page.evaluate(()=>{ const m=document.getElementById('mobile-menu'); const p=m.querySelector('.mm__panel'); const r=p.getBoundingClientRect(); const cs=getComputedStyle(m); return { hidden:m.hidden, open:m.classList.contains('is-open'), panel:[r.x,r.y,r.width,r.height].map(Math.round), mmPos: cs.position, mmRect: (()=>{const q=m.getBoundingClientRect(); return [q.x,q.y,q.width,q.height].map(Math.round)})(), header: getComputedStyle(document.getElementById('site-header')).position }; });
console.log(JSON.stringify(info));
await page.screenshot({ path: 'out/_menu-open.png' });
// scrolled state: close, scroll, reopen
await page.tap('#mobile-menu .mm__close'); await page.waitForTimeout(500);
await page.evaluate(()=>window.scrollTo(0, 900)); await page.waitForTimeout(400);
await page.tap('#burger'); await page.waitForTimeout(600);
await page.screenshot({ path: 'out/_menu-open-scrolled.png' });
console.log(JSON.stringify(await page.evaluate(()=>{ const p=document.querySelector('#mobile-menu .mm__panel').getBoundingClientRect(); return [p.x,p.y,p.width,p.height].map(Math.round); })));
await browser.close(); srv.close();
