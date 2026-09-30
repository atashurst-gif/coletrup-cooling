// Screenshot every frame that shows one of the given images: node tools/snap-frames.mjs <width> <name-fragment>...
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.mjs':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.json':'application/json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4324,r));
const [,, width='1440', ...frags] = process.argv;
const pages = ['/', '/about/', '/air-conditioning-installation/', '/air-conditioning-repairs/', '/commercial-air-conditioning/', '/residential-air-conditioning/', '/commercial-air-conditioning-repairs/', '/commercial-air-conditioning-maintenance/', '/refrigeration-repairs-maintenance/', '/planned-maintenance-service-contracts/', '/air-conditioning-servicing-maintenance/'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:+width, height: 900 }, deviceScaleFactor: 1 });
let n = 0;
for (const path of pages) {
  await page.goto('http://localhost:4324'+path, { waitUntil:'networkidle' });
  await page.evaluate(()=>{ document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-visible')); document.querySelector('.cookie-banner, [data-cookie-banner]')?.remove(); });
  const imgs = await page.$$('img');
  for (const img of imgs) {
    const src = await img.getAttribute('src') || '';
    if (!frags.some(f => src.includes(f))) continue;
    const frame = await img.evaluateHandle(e => e.closest('.frame, picture') || e);
    await img.scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
    const el = frame.asElement(); const box = await el.boundingBox(); if (!box || box.width < 40) continue;
    const name = `frame-${String(n++).padStart(2,'0')}-${path.replace(/\//g,'_')}-${frags.find(f=>src.includes(f)).slice(0,12)}.png`;
    await el.screenshot({ path: 'out/' + name });
    console.log(name, Math.round(box.width)+'x'+Math.round(box.height));
  }
}
await browser.close(); srv.close();
