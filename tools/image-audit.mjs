#!/usr/bin/env node
/**
 * IMAGE AUDIT — run after `astro build` (part of `npm run build`).
 *
 * Site rule: every PHOTO appears on exactly ONE page (and once on that page).
 * Decorative graphics (empty alt / `coletrup-airflow-graphic*`) are exempt from the
 * cross-page rule — the FinalCTA background is on every page by design — but must
 * still not repeat within a page.
 *
 * Exit 1 on any violation so a bad allocation never ships.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : f === 'index.html' && pages.push(p);
  }
})(dist);

const isGraphic = (name) => /^coletrup-airflow-graphic/.test(name);
const usage = new Map(); // photo → Set(routes)
let problems = 0;

for (const p of pages.sort()) {
  const html = readFileSync(p, 'utf8');
  const route = p.replace(dist, '/').replace('index.html', '');
  const names = [...html.matchAll(/<img[^>]+src="\/assets\/([a-z0-9-]+)\.[A-Za-z0-9_-]+\.(?:jpg|webp|avif|png)"/g)].map((m) => m[1]);
  const counts = {};
  names.forEach((n) => (counts[n] = (counts[n] || 0) + 1));
  const dup = Object.entries(counts).filter(([, c]) => c > 1);
  if (dup.length) problems++;
  for (const n of Object.keys(counts)) {
    if (isGraphic(n)) continue;
    if (!usage.has(n)) usage.set(n, new Set());
    usage.get(n).add(route);
  }
  const photos = names.filter((n) => !isGraphic(n));
  console.log(`${dup.length ? '✘' : '✔'} ${route}  ${photos.length} photo(s)${dup.length ? '  DUPLICATE ON PAGE: ' + dup.map(([n, c]) => `${n}×${c}`).join(', ') : ''}`);
  console.log('     ' + photos.join(', '));
}

const cross = [...usage.entries()].filter(([, routes]) => routes.size > 1);
if (cross.length) {
  problems += cross.length;
  console.log('\n✘ Photos used on more than one page:');
  for (const [n, routes] of cross) console.log(`   ${n}  →  ${[...routes].join('  ')}`);
}
console.log(`\n${usage.size} distinct photos across ${pages.length} pages`);
if (problems) {
  console.error(`\n${problems} problem(s) — every photo must appear on exactly one page.`);
  process.exit(1);
}
console.log('✔ no duplicates: every photo appears on exactly one page');
