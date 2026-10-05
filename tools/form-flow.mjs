// Quote form checks (no Continue button; options move on when chosen): node tools/form-flow.mjs
// Runs against ./dist with every POST intercepted, so nothing is ever sent to the live form.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const shots = '/tmp/claude-0/-home-claude-coletrup-cooling/1f819917-8096-5d4e-8eb3-6271fb89cd98/scratchpad/';
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.avif':'image/avif', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ico':'image/x-icon' };
const srv = createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); let f=join(dist,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)){res.writeHead(404);res.end('nf');return;} res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream'}); res.end(readFileSync(f)); });
await new Promise(r=>srv.listen(0,r));
const base = `http://localhost:${srv.address().port}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const results = []; const ok = (n, c, d = '') => results.push(`${c ? '✔' : '✖'} ${n}${d !== '' ? ' — ' + d : ''}`);
const errors = [];

async function open(path, opts = {}) {
  const ctx = await browser.newContext(opts.touch ? { viewport: { width: opts.width || 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : { viewport: { width: opts.width || 1366, height: 900 }, javaScriptEnabled: opts.js !== false });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`${path}: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${path}: ${m.text()}`); });
  page.posted = null;
  await page.route('**/*', async (route) => { const req = route.request(); if (req.method() === 'POST') { page.posted = { url: req.url(), body: req.postData() }; return route.fulfill({ status: 200, body: 'ok' }); } return route.continue(); });
  await page.goto(base + path, { waitUntil: 'networkidle' });
  if (opts.js !== false) {
    await page.evaluate(() => { document.querySelectorAll('dialog[open]').forEach((d) => d.close()); document.getElementById('cookie-banner')?.remove(); });
    await page.locator('#quote-form').scrollIntoViewIfNeeded();
  }
  return page;
}
const F = '#quote-form';
const step = (page) => page.evaluate(() => { const a = document.querySelector('#quote-form [data-step].is-active'); return a ? +a.dataset.step : 0; });
const picked = (page, name) => page.evaluate((n) => document.querySelector(`#quote-form input[name="${n}"]:checked`)?.value ?? null, name);
const card = (page, n, label) => page.locator(`${F} [data-step="${n}"] .qf__opt-card:has(.qf__opt-label:text-is("${label}"))`);
const continueShown = (page) => page.evaluate(() => [...document.querySelectorAll('#quote-form button, #quote-form a')].filter((b) => b.offsetParent !== null && /continue/i.test(b.textContent)).length);
const shot = async (page, name) => { await page.locator('#quote .qf__panel').screenshot({ path: `${shots}form-${name}.png` }); };

// ---- 1. Mouse journey, start to finish
{
  const page = await open('/');
  ok('Starts on step 1 with nothing selected', (await step(page)) === 1 && (await picked(page, 'service')) === null);
  ok('No Continue button on step 1', (await continueShown(page)) === 0);
  await shot(page, 'd1');
  await card(page, 1, 'Air Conditioning').click();
  await page.waitForTimeout(500);
  ok('Clicking a card moves to step 2', (await step(page)) === 2 && (await picked(page, 'service')) === 'air-conditioning', `step ${await step(page)}`);
  ok('Step 2: nothing pre-selected, no Continue, Back shown', (await picked(page, 'customer_type')) === null && (await continueShown(page)) === 0 && await page.isVisible(`${F} [data-back]`));
  ok('No keyboard focus ring flashed up after a mouse click', await page.evaluate(() => !document.activeElement.matches(':focus-visible')));
  await shot(page, 'd2');
  await card(page, 2, 'Residential').click();
  await page.waitForTimeout(500);
  ok('Clicking a card moves to step 3 (postcode)', (await step(page)) === 3);
  ok('Postcode box is ready to type in', await page.evaluate(() => document.activeElement?.id === 'quote-postcode'));
  ok('Step 3: arrow button shown, no Continue', await page.isVisible(`${F} [data-step="3"] [data-next]`) && (await continueShown(page)) === 0);
  await shot(page, 'd3');
  await page.waitForTimeout(200);
  await page.click(`${F} [data-step="3"] [data-next]`);
  ok('Empty postcode is rejected', (await step(page)) === 3 && await page.isVisible(`${F} [data-error-for="postcode"]`));
  await page.fill('#quote-postcode', 'NOTAPOSTCODE'); await page.click(`${F} [data-step="3"] [data-next]`);
  ok('Invalid postcode is rejected', (await step(page)) === 3 && await page.isVisible(`${F} [data-error-for="postcode"]`));
  await shot(page, 'd3-error');
  await page.fill('#quote-postcode', 'OL1 3AB'); await page.click(`${F} [data-step="3"] [data-next]`);
  await page.waitForTimeout(300);
  ok('Arrow button moves to step 4 (details) with the send button', (await step(page)) === 4 && await page.isVisible(`${F} [data-submit]`));
  await shot(page, 'd4');
  await page.click(`${F} [data-submit]`);
  ok('Empty details are rejected', await page.isVisible(`${F} [data-error-for="name"]`) && !page.posted);
  await page.fill('#quote-name', 'Test Person'); await page.fill('#quote-phone', '07700 900123'); await page.fill('#quote-email', 'test@example.com');
  await page.click(`${F} [data-submit]`); await page.waitForTimeout(700);
  const ref = await page.textContent('#quote [data-ref]');
  ok('Confirmation shown with a reference', await page.isVisible('#quote [data-confirmation]') && /^CC-\d{6}-[A-Z2-9]{5}$/.test(ref || ''), ref || '');
  const body = new URLSearchParams(page.posted?.body || '');
  ok('Sent data has every field', ['form-name', 'enquiry_id', 'service', 'customer_type', 'postcode', 'name', 'phone', 'email', 'subject', 'submitted_from'].every((k) => body.get(k)), [...body.keys()].join(','));
  ok('Sent values are the ones chosen', body.get('service') === 'air-conditioning' && body.get('customer_type') === 'residential' && body.get('postcode') === 'OL1 3AB' && body.get('form-name') === 'quote' && !body.get('company-website'));
  ok('Email subject names the job and the reference', body.get('subject') === `Website enquiry - Air conditioning, Residential - ${ref}`, body.get('subject'));
  await page.context().close();
}
// ---- 2. Back keeps the answer; clicking the same card again moves on
{
  const page = await open('/contact/');
  await card(page, 1, 'Repair').click(); await page.waitForTimeout(500);
  await page.click(`${F} [data-back]`); await page.waitForTimeout(450);
  ok('Back returns to step 1 with the answer kept', (await step(page)) === 1 && (await picked(page, 'service')) === 'repair');
  await card(page, 1, 'Repair').click(); await page.waitForTimeout(500);
  ok('Clicking the already-chosen card moves on again', (await step(page)) === 2);
  await page.context().close();
}
// ---- 3. Double-clicks cannot answer the next question by accident
{
  const page = await open('/');
  await card(page, 1, 'Refrigeration').dblclick(); await page.waitForTimeout(900);
  ok('Double-click on a card moves on one step only', (await step(page)) === 2 && (await picked(page, 'customer_type')) === null && !(await page.isVisible(`${F} [data-error-for="customer_type"]`)), `step ${await step(page)}`);
  const p2 = await open('/');
  const c = p2.locator(`${F} [data-step="1"] .qf__opt-card`).first(); const b = await c.boundingBox();
  await p2.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
  await p2.waitForTimeout(260);                      // step 2 has just appeared under the pointer
  await p2.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
  await p2.waitForTimeout(700);
  ok('A slow second click landing on the new step is ignored', (await step(p2)) === 2 && (await picked(p2, 'customer_type')) === null, `step ${await step(p2)}, picked ${await picked(p2, 'customer_type')}`);
  await card(p2, 2, 'Commercial').click(); await p2.waitForTimeout(500);
  ok('A normal click afterwards still works', (await step(p2)) === 3 && (await picked(p2, 'customer_type')) === 'commercial');
  await page.context().close(); await p2.context().close();
}
// ---- 4. Keyboard only
{
  const page = await open('/contact/');
  await page.focus(`${F} input[name="service"]`);
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(350);
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(450);
  ok('Arrow keys move between options without leaving the step', (await step(page)) === 1 && (await picked(page, 'service')) === 'repair', `step ${await step(page)}, picked ${await picked(page, 'service')}`);
  await page.keyboard.press('Enter'); await page.waitForTimeout(450);
  ok('Enter moves on', (await step(page)) === 2);
  ok('Focus lands on the first option of step 2', await page.evaluate(() => document.activeElement?.name === 'customer_type'));
  await page.keyboard.press('Space'); await page.waitForTimeout(500);
  ok('Space chooses the focused option and moves on', (await step(page)) === 3 && (await picked(page, 'customer_type')) === 'residential', `step ${await step(page)}`);
  await page.keyboard.type('m1 1aa'); await page.keyboard.press('Enter'); await page.waitForTimeout(350);
  ok('Enter in the postcode box moves on', (await step(page)) === 4);
  const p2 = await open('/contact/');
  await p2.focus(`${F} input[name="service"][value="refrigeration"]`);
  await p2.keyboard.press('Enter'); await p2.waitForTimeout(450);
  ok('Enter on a focused option chooses it and moves on', (await step(p2)) === 2 && (await picked(p2, 'service')) === 'refrigeration');
  await page.context().close(); await p2.context().close();
}
// ---- 5. Phone: taps
for (const width of [390, 320]) {
  const page = await open('/', { touch: true, width });
  await card(page, 1, 'Servicing / Maintenance').tap(); await page.waitForTimeout(500);
  const s2 = await step(page);
  if (width === 390) await shot(page, 'm2');
  await card(page, 2, 'Commercial').tap(); await page.waitForTimeout(500);
  const s3 = await step(page);
  await shot(page, `m3-${width}`);
  const go = await page.locator(`${F} [data-step="3"] [data-next]`).boundingBox();
  const input = await page.locator('#quote-postcode').boundingBox();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  await page.fill('#quote-postcode', 'M1 1AA'); await page.locator(`${F} [data-step="3"] [data-next]`).tap(); await page.waitForTimeout(350);
  ok(`Phone ${width}px: tap, tap, arrow reaches the details step`, s2 === 2 && s3 === 3 && (await step(page)) === 4, `${s2},${s3},${await step(page)}`);
  ok(`Phone ${width}px: arrow button is a full-size tap target beside the box, page not widened`, go.width >= 48 && go.height >= 48 && Math.abs(go.y - input.y) < 2 && input.width >= 120 && overflow <= 0, `button ${Math.round(go.width)}x${Math.round(go.height)}, box ${Math.round(input.width)}px wide, overflow ${overflow}`);
  if (width === 390) await shot(page, 'm4');
  await page.context().close();
}
// ---- 6. Pages that used to pre-select an answer
for (const path of ['/residential-air-conditioning/', '/commercial-air-conditioning-repairs/', '/contact/?service=refrigeration&type=commercial']) {
  const page = await open(path);
  const none = (await picked(page, 'service')) === null && (await picked(page, 'customer_type')) === null;
  await card(page, 1, 'Repair').click(); await page.waitForTimeout(500);
  ok(`${path}: starts unselected and a click moves on`, none && (await step(page)) === 2);
  await page.context().close();
}
// ---- 7. JavaScript switched off: one plain form that still posts
{
  const page = await open('/residential-air-conditioning/', { js: false });
  const st = await page.evaluate(() => ({ fieldsets: [...document.querySelectorAll('#quote-form [data-step]')].filter((f) => f.offsetParent !== null).length, go: [...document.querySelectorAll('#quote-form [data-next]')].filter((b) => b.offsetParent !== null).length, submit: document.querySelector('#quote-form [data-submit]').offsetParent !== null, service: document.querySelector('#quote-form input[name="service"]:checked')?.value ?? null, type: document.querySelector('#quote-form input[name="customer_type"]:checked')?.value ?? null, cont: /continue/i.test(document.querySelector('#quote-form').textContent) }));
  ok('Without JavaScript: all four parts shown, send button shown, no arrow or Continue, page defaults kept', st.fieldsets === 4 && st.go === 0 && st.submit && !st.cont && st.service === 'air-conditioning' && st.type === 'residential', JSON.stringify(st));
  await page.context().close();
}
// ---- 8. Accessibility rules (axe) on each step of the form
{
  const axe = readFileSync(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
  const page = await open('/contact/');
  await page.addScriptTag({ content: axe });
  const run = async () => (await page.evaluate(async () => (await window.axe.run('#quote', { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map((v) => `${v.id} (${v.nodes.length})`)));
  const v1 = await run();
  await card(page, 1, 'Repair').click(); await page.waitForTimeout(600); const v2 = await run();
  await card(page, 2, 'Commercial').click(); await page.waitForTimeout(600); const v3 = await run();
  const name = await page.evaluate(() => { const b = document.querySelector('#quote-form [data-step="3"] [data-next]'); return b.getAttribute('aria-label'); });
  await page.fill('#quote-postcode', 'M1 1AA'); await page.click(`${F} [data-step="3"] [data-next]`); await page.waitForTimeout(400); const v4 = await run();
  ok('No accessibility rule failures on any step', [v1, v2, v3, v4].every((v) => v.length === 0), JSON.stringify([v1, v2, v3, v4]));
  ok('Arrow button has a spoken name', name === 'Next step', name);
  const arrow = await page.evaluate(() => getComputedStyle(document.querySelector('#quote-form .qf__back-icon')).transform);
  ok('Back arrow points left', arrow.startsWith('matrix(-1'), arrow);
  await page.context().close();
}
ok('No script errors during any of the above', errors.length === 0, errors.slice(0, 4).join(' | '));
console.log(results.join('\n'));
await browser.close(); srv.close();
process.exit(results.some((r) => r.startsWith('✖')) ? 1 : 0);
