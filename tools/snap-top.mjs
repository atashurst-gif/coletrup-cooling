// Viewport screenshot of the top of a page (optionally after scrolling): node tools/snap-top.mjs <path> <name> <width> [scrollY]
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mjs':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.json':'application/json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4322,r));
const [,, path='/', name='top', width='1440', scrollY='0'] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:+width, height: +width<600?844:900 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4322'+path, { waitUntil:'networkidle' });
await page.evaluate((y)=>{ document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0,y); }, +scrollY);
await page.waitForTimeout(700);
const out = `/home/claude/coletrup-cooling/out/_${name}.png`;
await page.screenshot({ path: out });
console.log('saved', out);
await browser.close(); srv.close();
