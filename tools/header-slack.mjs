// Measures spare room in the desktop header row: node tools/header-slack.mjs [path]
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(0,r));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport: { width: 1440, height: 800 } });
await page.goto(`http://localhost:${srv.address().port}${process.argv[2] || '/'}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
for (const w of [320, 360, 390, 639, 640, 800, 1079, 1080, 1100, 1200, 1279, 1280, 1359, 1360, 1440, 1499, 1500, 1600, 1920]) {
  await page.setViewportSize({ width: w, height: 800 });
  await page.waitForTimeout(350);
  const r = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const inner = q('.site-header__inner'), nav = q('.site-nav'), list = q('.site-nav__list'), logo = q('.site-header__logo'), act = q('.site-header__actions');
    const rect = (e) => e.getBoundingClientRect();
    const navShown = getComputedStyle(nav).display !== 'none';
    const items = navShown ? [...list.children] : [];
    const itemsW = items.length ? rect(items[items.length - 1]).right - rect(items[0]).left : 0;
    const gapLogoAct = rect(act).left - rect(logo).right;
    return { navShown, inner: Math.round(rect(inner).width), logo: Math.round(rect(logo).width), actions: Math.round(rect(act).width), navBox: navShown ? Math.round(rect(nav).width) : 0, navItems: Math.round(itemsW), slack: Math.round(navShown ? rect(nav).width - itemsW : gapLogoAct), pageOverflow: document.documentElement.scrollWidth - innerWidth };
  });
  console.log(String(w).padStart(5), JSON.stringify(r));
}
await browser.close(); srv.close();
