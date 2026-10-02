// Mobile spacing audit: prints each section's top/bottom padding and the visible gap to the next section.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4325,r));
const width = +(process.argv[2] || 390);
const routes = process.argv.slice(3).length ? process.argv.slice(3) : ['/','/residential-air-conditioning/','/air-conditioning-installation/','/air-conditioning-repairs/','/air-conditioning-servicing-maintenance/','/commercial-air-conditioning/','/commercial-air-conditioning-repairs/','/commercial-air-conditioning-maintenance/','/refrigeration-repairs-maintenance/','/commercial-chiller-freezer-repairs/','/cold-room-repairs-maintenance/','/display-fridge-repairs-maintenance/','/cellar-cooling-repairs-maintenance/','/planned-maintenance-service-contracts/','/about/','/areas-we-cover/','/contact/'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width, height: 844 } });
const seen = new Map();
for (const r of routes) {
  await page.goto('http://localhost:4325'+r, { waitUntil:'networkidle' });
  await page.addStyleTag({ content: '[data-reveal]{transform:none!important;opacity:1!important;transition:none!important} .cookie,#lead-bar{display:none!important}' });
  await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = false));
  const rows = await page.evaluate(() => {
    const main = document.querySelector('main');
    const blocks = [...main.children].filter(e => e.offsetHeight > 0);
    // content box: first/last visible descendant extents inside the block
    const inner = (el) => {
      let top = Infinity, bottom = -Infinity;
      for (const c of el.querySelectorAll('h1,h2,h3,p,li,img,a,button,form,svg,figure,details,.card,.frame')) {
        if (c.closest('.airflow') || c.closest('.fcta__bg') || c.closest('details:not([open]) > :not(summary)')) continue;
        const b = c.getBoundingClientRect(); if (!b.width || !b.height) continue;
        const cs = getComputedStyle(c); if (cs.position === 'absolute' || cs.position === 'fixed') continue;
        top = Math.min(top, b.top + scrollY); bottom = Math.max(bottom, b.bottom + scrollY);
      }
      return { top, bottom };
    };
    return blocks.map(el => { const b = el.getBoundingClientRect(); const i = inner(el); return { name: (el.id || el.className.toString().split(' ').slice(0,3).join('.')).slice(0,44), bg: getComputedStyle(el).backgroundColor, top: b.top + scrollY, bottom: b.bottom + scrollY, ctop: i.top, cbottom: i.bottom }; });
  });
  console.log('\n' + r);
  for (let i = 0; i < rows.length; i++) {
    const a = rows[i], n = rows[i+1];
    const padT = Math.round(a.ctop - a.top), padB = Math.round(a.bottom - a.cbottom);
    const gap = n ? Math.round(n.ctop - a.cbottom) : null;
    console.log(`  ${a.name.padEnd(46)} top ${String(padT).padStart(4)}  bottom ${String(padB).padStart(4)}${gap!==null ? '   gap→next ' + String(gap).padStart(4) + (n.bg!==a.bg ? '' : '  (same colour)') : ''}`);
  }
}
await browser.close(); srv.close();
