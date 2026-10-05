// What happens today when a visitor clicks an option card (not the hidden radio itself)?
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(0,r));
const base = `http://localhost:${srv.address().port}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
for (const mode of ['mouse', 'touch']) {
  const ctx = await browser.newContext(mode === 'touch' ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/contact/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    window.__clicks = [];
    document.querySelectorAll('#quote-form input[name="service"]').forEach((r) => r.addEventListener('click', (e) => window.__clicks.push({ on: 'input', detail: e.detail, trusted: e.isTrusted, pointerType: e.pointerType ?? null })));
    document.querySelectorAll('#quote-form .qf__opt').forEach((l) => l.addEventListener('click', (e) => window.__clicks.push({ on: 'label', target: e.target.tagName, detail: e.detail })));
    document.querySelectorAll('dialog[open]').forEach((d) => d.close());
  });
  const card = page.locator('#quote-form [data-step="1"] .qf__opt-card').first();
  await card.scrollIntoViewIfNeeded();
  if (mode === 'touch') await card.tap(); else await card.click();
  await page.waitForTimeout(600);
  const state = await page.evaluate(() => ({ checked: document.querySelector('#quote-form input[name="service"]:checked')?.value ?? null, step2Visible: !!document.querySelector('#quote-form [data-step="2"].is-active'), continueVisible: (() => { const b = document.querySelector('#quote-form [data-next]'); return !!b && !b.hidden && b.offsetParent !== null; })(), clicks: window.__clicks }));
  console.log(mode, JSON.stringify(state));
  await ctx.close();
}
await browser.close(); srv.close();
