// Screenshot the mid-page CTA band on a few pages + the lead bar mid-page: node tools/snap-midcta.mjs
import { chromium, devices } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.json':'application/json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4327,r));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(()=>sessionStorage.setItem('cc-first-seen', String(Date.now()-60000)));
for (const [path, sel, name] of [['/', '#home-mid-cta', 'mid-home'], ['/air-conditioning-installation/', '[id$="-mid-cta"]', 'mid-install'], ['/about/', '#about-mid-cta', 'mid-about']]) {
  await page.goto('http://localhost:4327'+path, { waitUntil:'networkidle' });
  await page.evaluate(()=>{ document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-visible')); document.getElementById('cookie-banner')?.remove(); });
  const el = page.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
  await page.screenshot({ path: `out/_${name}.png` });
  const hidden = await page.evaluate(()=>document.getElementById('lead-bar').classList.contains('is-hidden'));
  console.log(name, 'lead bar hidden while CTA in view:', hidden);
}
// mobile: lead bar visible mid-page
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
await ctx.addInitScript(()=>sessionStorage.setItem('cc-first-seen', String(Date.now()-60000)));
const mp = await ctx.newPage();
await mp.goto('http://localhost:4327/', { waitUntil:'networkidle' });
await mp.evaluate(()=>{ document.documentElement.style.scrollBehavior='auto'; document.getElementById('cookie-banner')?.remove(); window.scrollTo(0, document.querySelector('#residential').offsetTop + 200); });
await mp.waitForTimeout(800);
await mp.screenshot({ path: 'out/_leadbar-mobile.png' });
console.log('mobile lead bar hidden mid-page:', await mp.evaluate(()=>document.getElementById('lead-bar').classList.contains('is-hidden')));
await browser.close(); srv.close();
