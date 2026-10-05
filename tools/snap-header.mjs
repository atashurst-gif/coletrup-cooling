// Header check: node tools/snap-header.mjs [path]  → the header at several widths (top of page)
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
for (const w of [320, 390, 800, 1080, 1280, 1440]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: w < 600 ? 2 : 1 });
  await page.goto(base + (process.argv[2] || '/'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('dialog[open]').forEach((d) => d.close()));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${out}hdr-${w}.png`, clip: { x: 0, y: 0, width: w, height: w < 640 ? 100 : 140 } });
  await page.close();
}
await browser.close(); srv.close();
console.log('header shots saved');
