// Render an SVG file to PNG with Chromium: node tools/render-svg.mjs in.svg out.png width [background]
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [,, src, out, width='1026', bg='transparent'] = process.argv;
const svg = readFileSync(src, 'utf8');
const m = svg.match(/viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/); const vw=+m[3], vh=+m[4];
const w = +width, h = Math.round(w*vh/vw);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport:{ width:w, height:h }, deviceScaleFactor:1 });
await page.setContent(`<html><body style="margin:0;background:${bg}">${svg.replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" height="${h}"`)}</body></html>`);
await page.screenshot({ path: out, omitBackground: bg==='transparent', clip:{x:0,y:0,width:w,height:h} });
console.log('rendered', out, w, h);
await browser.close();
