// Functional checks: form journey, tracking events, mobile menu, dropdowns, prefill, console errors
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain', '.webmanifest':'application/manifest+json' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){ res.writeHead(404); res.end('nf'); return; } res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(4321,r));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const results = []; const ok=(n,c,d='')=>results.push(`${c?'✔':'✖'} ${n}${d?' — '+d:''}`);

// 1) console errors on every page
const pages = ['/','/residential-air-conditioning/','/air-conditioning-installation/','/air-conditioning-repairs/','/air-conditioning-servicing-maintenance/','/commercial-air-conditioning/','/commercial-air-conditioning-repairs/','/commercial-air-conditioning-maintenance/','/refrigeration-repairs-maintenance/','/commercial-chiller-freezer-repairs/','/cellar-cooling-repairs-maintenance/','/cold-room-repairs-maintenance/','/display-fridge-repairs-maintenance/','/planned-maintenance-service-contracts/','/about/','/areas-we-cover/','/contact/','/privacy-policy/','/cookie-policy/','/terms/','/404.html'];
let errs=[]; const ctx = await browser.newContext({ viewport:{width:1366,height:900} }); const page = await ctx.newPage();
page.on('pageerror', e=>errs.push(e.message)); page.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
page.on('response', r=>{ if(r.status()>=400 && !r.url().endsWith('404.html')) errs.push(`HTTP ${r.status()} ${r.url()}`); });
for (const p of pages) { await page.goto('http://localhost:4321'+p, {waitUntil:'networkidle'}); }
ok('No console/page errors or 4xx across 20 pages', errs.length===0, errs.slice(0,5).join(' | '));

// 2) Quote form journey on homepage with mocked POST
await page.goto('http://localhost:4321/', {waitUntil:'networkidle'});
await page.evaluate(()=>localStorage.clear());
let posted=null; await page.route('**/*', async (route)=>{ const req=route.request(); if(req.method()==='POST'){ posted={url:req.url(), body:req.postData()}; return route.fulfill({status:200, body:'ok'}); } return route.continue(); });
await page.click('#cookie-banner [data-consent="accept"]');
const step1 = await page.isVisible('#quote-form [data-step="1"]'); const step2hidden = !(await page.isVisible('#quote-form [data-step="2"]'));
ok('Form shows only step 1 initially', step1 && step2hidden);
await page.click('#quote-form [data-next]');
ok('Validation blocks empty step 1', await page.isVisible('#quote-form [data-error-for="service"]'));
await page.click('#quote-form input[name="service"][value="air-conditioning"]');
await page.waitForTimeout(400);
ok('Auto-advance to step 2 after choosing service', await page.isVisible('#quote-form [data-step="2"]'));
await page.click('#quote-form input[name="customer_type"][value="residential"]'); await page.waitForTimeout(400);
ok('Step 3 (postcode) visible', await page.isVisible('#quote-postcode'));
await page.fill('#quote-postcode','NOTAPOSTCODE'); await page.click('#quote-form [data-next]');
ok('Invalid postcode rejected', await page.isVisible('#quote-form [data-error-for="postcode"]'));
await page.fill('#quote-postcode','OL1 3AB'); await page.click('#quote-form [data-next]');
ok('Step 4 (details) visible & submit button shown', await page.isVisible('#quote-name') && await page.isVisible('#quote-form [data-submit]'));
await page.click('#quote-form [data-submit]');
ok('Empty details rejected', await page.isVisible('#quote-form [data-error-for="name"]'));
await page.fill('#quote-name','Test Person'); await page.fill('#quote-phone','07700 900123'); await page.fill('#quote-email','test@example.com');
await page.click('#quote-form [data-submit]'); await page.waitForTimeout(600);
const conf = await page.isVisible('#quote [data-confirmation]'); const ref = await page.textContent('#quote [data-ref]');
ok('Confirmation shown with enquiry reference', conf && /^CC-\d{6}-[A-Z2-9]{5}$/.test(ref||''), ref||'');
const body = new URLSearchParams(posted?.body||'');
ok('POST contains form-name, enquiry_id, service, customer_type, postcode, name, phone, email, landing_page', ['form-name','enquiry_id','service','customer_type','postcode','name','phone','email','landing_page'].every(k=>body.has(k)) && body.get('enquiry_id')===ref, posted?.url||'no post');
const dl = await page.evaluate(()=>window.dataLayer.map(e=>e.event).filter(Boolean));
ok('dataLayer has quote_form_start, quote_form_step, quote_form_complete', ['quote_form_start','quote_form_step','quote_form_complete'].every(e=>dl.includes(e)), dl.join(','));
const waConf = await page.getAttribute('#quote [data-wa-link]','href');
ok('Confirmation WhatsApp/phone options present', !!waConf && await page.isVisible('#quote [data-confirmation] a[href^="tel"], #quote [data-confirmation] a[href*="contact"]'));

// 3) UTM capture
await page.goto('http://localhost:4321/?utm_source=google&utm_medium=cpc&utm_campaign=summer', {waitUntil:'networkidle'});
await page.goto('http://localhost:4321/contact/?service=refrigeration&type=commercial', {waitUntil:'networkidle'});
const attr = await page.evaluate(()=>window.ccAttribution());
ok('UTM persisted across pages after consent', attr.utm_source==='google' && attr.utm_campaign==='summer' && attr.landing_page.startsWith('/?utm_source'), JSON.stringify(attr));
ok('Contact prefill from ?service=&type=', await page.isChecked('#quote-form input[name="service"][value="refrigeration"]') && await page.isChecked('#quote-form input[name="customer_type"][value="commercial"]'));
const cta = await page.evaluate(async()=>{ const a=document.querySelector('[data-cta="whatsapp"]'); a.addEventListener('click',e=>e.preventDefault(),{once:true}); a.click(); return window.dataLayer.filter(e=>e.event==='whatsapp_click').length; });
ok('WhatsApp click tracked', cta>=1);

// 4) Desktop dropdown via keyboard + mobile menu
await page.goto('http://localhost:4321/', {waitUntil:'networkidle'});
await page.focus('.site-nav__toggle'); await page.keyboard.press('Enter');
ok('Dropdown opens via keyboard', (await page.getAttribute('.site-nav__toggle','aria-expanded'))==='true');
await page.keyboard.press('Escape');
ok('Dropdown closes on Escape', (await page.getAttribute('.site-nav__toggle','aria-expanded'))==='false');
const m = await browser.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true }); const mp = await m.newPage();
await mp.goto('http://localhost:4321/', {waitUntil:'networkidle'});
const sw = await mp.evaluate(()=>document.documentElement.scrollWidth); ok('No horizontal overflow on 390px', sw<=390, String(sw));
await mp.click('#burger'); await mp.waitForTimeout(450);
const panelH = await mp.evaluate(()=>document.querySelector('#mobile-menu .mm__panel').getBoundingClientRect().height); ok('Mobile menu opens full-height', await mp.isVisible('#mobile-menu .mm__panel') && (await mp.getAttribute('#burger','aria-expanded'))==='true' && panelH >= 700, `panel ${Math.round(panelH)}px`);
await mp.click('#mobile-menu .mm__acc >> nth=0'); ok('Mobile accordion expands', await mp.isVisible('#mobile-menu .mm__sub a >> nth=0'));
await mp.keyboard.press('Escape'); await mp.waitForTimeout(450); ok('Mobile menu closes on Escape', await mp.isHidden('#mobile-menu'));
// sticky bar: hidden for the first 20s on the site, at the top of the page, and near any CTA
const hiddenAtStart = await mp.evaluate(()=>document.getElementById('lead-bar').classList.contains('is-hidden'));
ok('Lead bar hidden on a fresh visit (20s delay)', hiddenAtStart);
// simulate a visitor who has been on the site for a minute, then reload
await mp.evaluate(()=>sessionStorage.setItem('cc-first-seen', String(Date.now()-60000)));
await mp.reload({waitUntil:'networkidle'}); await mp.waitForTimeout(300);
ok('Lead bar stays hidden at the top of the page', await mp.evaluate(()=>document.getElementById('lead-bar').classList.contains('is-hidden')));
// scroll to the middle of the residential section (no CTA in view)
await mp.evaluate(()=>window.scrollTo({top: document.querySelector('#residential').offsetTop + 200, behavior:'instant'})); await mp.waitForTimeout(700);
ok('Lead bar shows mid-page once the delay has passed', await mp.evaluate(()=>!document.getElementById('lead-bar').classList.contains('is-hidden')));
await mp.evaluate(()=>window.scrollTo({top: document.querySelector('#home-mid-cta').offsetTop - 200, behavior:'instant'})); await mp.waitForTimeout(700);
ok('Lead bar hides while the mid-page CTA is in view', await mp.evaluate(()=>document.getElementById('lead-bar').classList.contains('is-hidden')));
await mp.evaluate(()=>window.scrollTo({top: document.querySelector('#quote').offsetTop + 100, behavior:'instant'})); await mp.waitForTimeout(700);
ok('Lead bar hides while quote form in view', await mp.evaluate(()=>document.getElementById('lead-bar').classList.contains('is-hidden')));
await mp.evaluate(()=>window.scrollTo({top: document.querySelector('#residential').offsetTop + 200, behavior:'instant'})); await mp.waitForTimeout(700);
ok('Lead bar returns when scrolled away', await mp.evaluate(()=>!document.getElementById('lead-bar').classList.contains('is-hidden')));
// touch target sizes of bar buttons
const sizes = await mp.evaluate(()=>[...document.querySelectorAll('#lead-bar a')].map(a=>a.getBoundingClientRect().height));
ok('Lead bar buttons ≥ 48px tall on mobile', sizes.every(h=>h>=48), sizes.join(','));

console.log(results.join('\n'));
await browser.close(); srv.close();
process.exit(results.some(r=>r.startsWith('✖'))?1:0);
