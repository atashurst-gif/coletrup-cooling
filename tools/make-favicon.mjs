// Builds the favicon set from the approved logo mark (public/brand/coletrup-cooling-mark.svg).
// The mark itself is untouched: it is centred on a white tile so it stays easy to see on both
// light and dark browser tabs.  Run: node tools/make-favicon.mjs && python3 tools/make-favicon-ico.py
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const root = new URL('../', import.meta.url).pathname;
const mark = readFileSync(root + 'public/brand/coletrup-cooling-mark.svg', 'utf8');
const viewBox = mark.match(/viewBox="([^"]+)"/)[1];
const inner = mark.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport: { width: 600, height: 600 }, deviceScaleFactor: 1 });
await page.setContent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="512" height="512"><g id="m">${inner}</g></svg>`);
const bb = await page.evaluate(() => { const b = document.getElementById('m').getBBox(); return { x: b.x, y: b.y, width: b.width, height: b.height }; });
console.log('mark bounds', JSON.stringify(bb));

const S = 64;
const tile = ({ rx, pad }) => {
  const avail = S * (1 - 2 * pad);
  const k = Math.min(avail / bb.width, avail / bb.height);
  const tx = (S - bb.width * k) / 2 - bb.x * k;
  const ty = (S - bb.height * k) / 2 - bb.y * k;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img" aria-label="Coletrup Cooling"><rect width="${S}" height="${S}" rx="${rx}" fill="#fff"/><g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${k.toFixed(5)})">${inner}</g></svg>`;
};
const rounded = tile({ rx: 13, pad: 0.085 }); // browser tabs
const square = tile({ rx: 0, pad: 0.13 }); // phone home screens (the phone rounds the corners itself)
writeFileSync(root + 'public/favicon.svg', rounded + '\n');

async function render(svg, size, out, transparent) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" style="display:block" `)}</body></html>`);
  await page.screenshot({ path: out, omitBackground: transparent, clip: { x: 0, y: 0, width: size, height: size } });
  console.log('wrote', out.replace(root, ''), size);
}
await render(rounded, 16, root + 'public/favicon-16.png', true);
await render(rounded, 32, root + 'public/favicon-32.png', true);
await render(rounded, 48, root + 'public/favicon-48.png', true);
await render(rounded, 96, root + 'public/favicon-96.png', true);
await render(square, 180, root + 'public/apple-touch-icon.png', false);
await render(square, 512, root + 'public/icon-512.png', false);
await browser.close();
