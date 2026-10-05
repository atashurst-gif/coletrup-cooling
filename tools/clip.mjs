// Clip helper: node tools/clip.mjs <path> <name> <width> <selector> [selector2]  → screenshot from the top of selector to the bottom of selector2
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mjs':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(0,r));
const port = srv.address().port;
const [,, path='/', name='clip', width='1440', sel='main', sel2] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:+width, height: +width<600?844:900 }, deviceScaleFactor: +width<600?2:1 });
page.on('pageerror', e=>console.log('PAGEERROR', e.message));
await page.goto(`http://localhost:${port}${path}`, { waitUntil:'networkidle' });
await page.evaluate(async(keepFixed)=>{ sessionStorage.setItem('cc-promo-seen','1'); document.querySelectorAll('dialog[open]').forEach(d=>d.close()); document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-visible')); const imgs=[...document.querySelectorAll('img')]; imgs.forEach(i=>{ i.loading='eager'; }); window.scrollTo(0,document.body.scrollHeight); await new Promise(r=>setTimeout(r,300)); await Promise.all(imgs.map(i=>i.decode().catch(()=>{}))); window.scrollTo(0,0); if(!keepFixed) document.querySelectorAll('body *').forEach(e=>{ const p=getComputedStyle(e).position; if(p==='fixed'||p==='sticky') e.style.setProperty('display','none','important'); }); await new Promise(r=>setTimeout(r,300)); }, process.env.KEEP_FIXED==='1');
const box = await page.evaluate(([a,b])=>{ const A=document.querySelector(a); const B=b?document.querySelector(b):A; if(!A||!B) return null; const ra=A.getBoundingClientRect(), rb=B.getBoundingClientRect(); return { y: ra.top+scrollY, h: rb.bottom-ra.top }; }, [sel, sel2]);
if(!box){ console.log('selector not found'); process.exit(1); }
const out = `/tmp/claude-0/-home-claude-coletrup-cooling/1f819917-8096-5d4e-8eb3-6271fb89cd98/scratchpad/${name}.png`;
await page.screenshot({ path: out, fullPage: true, clip: { x:0, y: Math.max(0, box.y), width:+width, height: Math.ceil(box.h) } });
console.log('saved', out, JSON.stringify(box));
await browser.close(); srv.close();
