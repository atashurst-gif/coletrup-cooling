import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain', '.webmanifest':'application/manifest+json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end();return;} const h={'Content-Type':types[extname(f)]||'application/octet-stream'}; if(p.startsWith('/assets/')) h['Cache-Control']='public, max-age=31536000, immutable'; const buf=readFileSync(f); const ext=extname(f); if(['.html','.css','.js','.svg','.xml','.txt','.webmanifest'].includes(ext)){ h['Content-Encoding']='gzip'; res.writeHead(200,h); res.end(gzipSync(buf)); } else { res.writeHead(200,h); res.end(buf); } });
await new Promise(r=>srv.listen(4321,r));
const chrome = await launch({ chromePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', chromeFlags: ['--headless=new','--no-sandbox','--disable-gpu'] });
for (const [path, form] of [['/', 'mobile'], ['/', 'desktop'], ['/residential-air-conditioning/', 'mobile']]) {
  const r = await lighthouse('http://localhost:4321'+path, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance','accessibility','best-practices','seo'], formFactor: form, screenEmulation: form==='desktop'?{mobile:false,width:1350,height:940,deviceScaleFactor:1,disabled:false}:{mobile:true,width:412,height:823,deviceScaleFactor:1.75,disabled:false}, throttlingMethod: 'simulate' });
  const c = r.lhr.categories; const a = r.lhr.audits;
  console.log(`${path} [${form}]  perf ${Math.round(c.performance.score*100)}  a11y ${Math.round(c.accessibility.score*100)}  bp ${Math.round(c['best-practices'].score*100)}  seo ${Math.round(c.seo.score*100)}  | FCP ${a['first-contentful-paint'].displayValue} LCP ${a['largest-contentful-paint'].displayValue} TBT ${a['total-blocking-time'].displayValue} CLS ${a['cumulative-layout-shift'].displayValue} SI ${a['speed-index'].displayValue}`);
  const lcpEl = a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet || a['lcp-discovery-insight']?.details?.items?.[0]?.node?.snippet || ''; if (lcpEl) console.log('   LCP element:', lcpEl.slice(0,140).replace(/\s+/g,' '));
  const fails = Object.values(a).filter(x=>x.score!==null && x.score<0.9 && x.scoreDisplayMode==='numeric' || (x.scoreDisplayMode==='binary' && x.score===0)).map(x=>`   - ${x.id}: ${x.displayValue||''}`);
  if (fails.length) console.log(fails.join('\n'));
}
await chrome.kill(); srv.close();
