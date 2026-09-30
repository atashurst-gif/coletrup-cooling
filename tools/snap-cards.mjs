import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = '/home/claude/coletrup-cooling/dist/';
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4325,r));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:1440, height: 900 }, deviceScaleFactor: 1 });
for (const [path, sel, name] of [['/', '#ac-services .svc__grid', 'home-cards'], ['/residential-air-conditioning/', '.svc__grid', 'res-cards'], ['/air-conditioning-installation/', '.duo__grid', 'install-duo']]) {
  await page.goto('http://localhost:4325'+path, { waitUntil:'networkidle' });
  await page.evaluate(()=>{ document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-visible')); document.querySelectorAll('.cookie, .cookie-banner, [data-cookie-banner], [data-consent]').forEach(e=>e.remove()); });
  const el = page.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await el.screenshot({ path: `/home/claude/coletrup-cooling/out/_${name}.png` }); console.log(name);
}
await browser.close(); srv.close();
