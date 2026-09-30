// Screenshot a page's hero at a given width with the cookie banner removed: node tools/snap-hero.mjs <path> <name> <width>
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.json':'application/json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4324,r));
const [,, path='/', name='hero', width='390'] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:+width, height: +width<600?844:900 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4324'+path, { waitUntil:'networkidle' });
await page.evaluate(async()=>{ document.querySelectorAll('.cookie, [class*="cookie"], #lead-bar').forEach(e=>e.remove()); document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-visible')); const imgs=[...document.querySelectorAll('.phero img, #hero img')]; imgs.forEach(i=>{ i.loading='eager'; }); await Promise.race([Promise.all(imgs.map(i=>i.decode().catch(()=>{}))), new Promise(r=>setTimeout(r,4000))]); });
const out = `/tmp/claude-0/-home-claude/1f819917-8096-5d4e-8eb3-6271fb89cd98/scratchpad/${name}.png`;
const hero = page.locator('.phero, #hero').first();
await hero.screenshot({ path: out });
console.log('saved', out);
await browser.close(); srv.close();
