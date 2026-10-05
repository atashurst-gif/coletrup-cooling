// Header check: node tools/snap-header.mjs  → header at several widths + the open mobile menu
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const out = '/tmp/claude-0/-home-claude-coletrup-cooling/1f819917-8096-5d4e-8eb3-6271fb89cd98/scratchpad/';
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ico':'image/x-icon' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(0,r));
const base = `http://localhost:${srv.address().port}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
for (const w of [1440, 1280, 1100, 1024]) {
  const page = await browser.newPage({ viewport: { width: w, height: 300 } });
  await page.addInitScript(() => { try { sessionStorage.setItem('cc-promo-seen', '1'); } catch {} });
  await page.goto(base + '/about/', { waitUntil: 'networkidle' });
  const over = await page.evaluate(() => { const h = document.querySelector('.site-header__inner'); return { scrollW: document.documentElement.scrollWidth, innerW: innerWidth, headerOverflow: h ? h.scrollWidth - h.clientWidth : null, items: [...document.querySelectorAll('.site-header nav > ul > li > a, .site-header nav > ul > li > button, .site-header nav a.nav__link')].map(a => a.textContent.trim().replace(/\s+/g,' ')).filter(Boolean).slice(0, 12) }; });
  console.log(w, JSON.stringify(over));
  await page.screenshot({ path: `${out}hdr-${w}.png`, clip: { x: 0, y: 0, width: w, height: 130 } });
  await page.close();
}
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto(base + '/', { waitUntil: 'networkidle' });
await m.evaluate(() => document.querySelectorAll('dialog[open]').forEach(d => d.close()));
const btn = m.locator('[data-menu-open], .site-header__menu, button[aria-controls]').first();
await btn.click().catch(e => console.log('menu click failed', e.message));
await m.waitForTimeout(500);
await m.screenshot({ path: `${out}menu-mob.png` });
console.log('menu items', JSON.stringify(await m.evaluate(() => [...document.querySelectorAll('.mm a, .mm button')].map(a => a.textContent.trim().replace(/\s+/g,' ')).filter(Boolean).slice(0, 14))));
await browser.close(); srv.close();
