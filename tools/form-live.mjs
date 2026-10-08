// Steps through the LIVE quote form without sending it: node tools/form-live.mjs [base]
// The final send is never clicked, and any POST is blocked as a safeguard.
import { chromium } from 'playwright';
const base = process.argv[2] || 'https://coletrupcooling.netlify.app';
const shots = '/tmp/claude-0/-home-claude-coletrup-cooling/1f819917-8096-5d4e-8eb3-6271fb89cd98/scratchpad/';
const px = process.env.HTTPS_PROXY || process.env.https_proxy;
const proxy = px ? (() => { const u = new URL(px); return { server: `${u.protocol}//${u.host}`, ...(u.username ? { username: decodeURIComponent(u.username), password: decodeURIComponent(u.password) } : {}) }; })() : undefined;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', proxy });
const out = [];
for (const [label, opts, path] of [['desktop', { viewport: { width: 1366, height: 900 } }, '/'], ['phone', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, '/residential-air-conditioning/']]) {
  const ctx = await browser.newContext(opts); const page = await ctx.newPage();
  let posts = 0; await page.route('**/*', (r) => { if (r.request().method() === 'POST') { posts++; return r.abort(); } return r.continue(); });
  await page.goto(base + path + '?nocache=' + Date.now(), { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => { document.querySelectorAll('dialog[open]').forEach((d) => d.close()); document.getElementById('cookie-banner')?.remove(); });
  await page.locator('#quote-form').scrollIntoViewIfNeeded();
  const step = () => page.evaluate(() => +document.querySelector('#quote-form [data-step].is-active').dataset.step);
  const act = (loc) => (opts.hasTouch ? loc.tap() : loc.click());
  const noContinue = await page.evaluate(() => ![...document.querySelectorAll('#quote-form button')].some((b) => /continue/i.test(b.textContent)));
  const unselected = await page.evaluate(() => !document.querySelector('#quote-form input[type="radio"]:checked'));
  const s1 = await step();
  await act(page.locator('#quote-form [data-step="1"] .qf__opt-card').first()); await page.waitForTimeout(700); const s2 = await step();
  await act(page.locator('#quote-form [data-step="2"] .qf__opt-card').first()); await page.waitForTimeout(700); const s3 = await step();
  await page.fill('#quote-postcode', 'M1 1AA'); await act(page.locator('#quote-form [data-step="3"] [data-next]')); await page.waitForTimeout(500); const s4 = await step();
  await page.locator('#quote .qf__panel').screenshot({ path: `${shots}live-form-${label}.png` });
  out.push(`${label} ${path}: no Continue=${noContinue}, starts unselected=${unselected}, steps ${s1}>${s2}>${s3}>${s4}, send button shown=${await page.isVisible('#quote-form [data-submit]')}, POSTs sent=${posts}`);
  await ctx.close();
}
console.log(out.join('\n'));
await browser.close();
