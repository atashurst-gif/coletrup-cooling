import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end();return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4321,r));
const axe = readFileSync('node_modules/axe-core/axe.min.js','utf8');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const pages = ['/','/residential-air-conditioning/','/air-conditioning-repairs/','/refrigeration-repairs-maintenance/','/planned-maintenance-service-contracts/','/about/','/areas-we-cover/','/contact/','/cookie-policy/'];
let total=0;
for (const vp of [{width:1366,height:900},{width:390,height:844}]) {
  const page = await browser.newPage({ viewport: vp });
  for (const p of pages) {
    await page.goto('http://localhost:4321'+p, {waitUntil:'networkidle'});
    await page.evaluate(()=>{ document.querySelectorAll('[data-reveal]').forEach(e=>{e.classList.add('is-visible'); e.style.transition='none'; e.style.opacity='1'; e.style.transform='none';}); }); await page.waitForTimeout(300);
    await page.addScriptTag({ content: axe });
    const r = await page.evaluate(async()=> await axe.run(document, { runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']} }));
    const v = r.violations.filter(v=>!['region'].includes(v.id));
    total += v.length;
    if (v.length) { console.log(`\n${vp.width}px ${p}`); v.forEach(x=>console.log(`  ✖ [${x.impact}] ${x.id}: ${x.help} (${x.nodes.length}) e.g. ${x.nodes[0].target[0]} :: ${x.nodes[0].failureSummary?.split('\n')[1]||''}`)); }
  }
  await page.close();
}
console.log(total? `\n${total} axe violation groups`: '\n✔ axe: no WCAG 2.1 AA / best-practice violations on 9 pages × 2 viewports');
await browser.close(); srv.close();
