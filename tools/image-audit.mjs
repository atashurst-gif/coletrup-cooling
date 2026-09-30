// Lists which photos appear on each built page and flags any photo used more than once on a page.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f === 'index.html' && pages.push(p); } })(dist);
let dupes = 0;
for (const p of pages.sort()) {
  const html = readFileSync(p, 'utf8');
  const names = [...html.matchAll(/<img[^>]+src="\/assets\/([a-z0-9-]+)\.[A-Za-z0-9_-]+\.(?:jpg|webp|avif|png)"/g)].map(m => m[1]);
  const counts = {}; names.forEach(n => counts[n] = (counts[n] || 0) + 1);
  const route = p.replace(dist, '/').replace('index.html', '');
  const dup = Object.entries(counts).filter(([, c]) => c > 1);
  if (dup.length) dupes++;
  console.log(`${dup.length ? '✘' : '✔'} ${route}  ${names.length} photos${dup.length ? '  DUPLICATE: ' + dup.map(([n, c]) => `${n}×${c}`).join(', ') : ''}`);
  console.log('     ' + names.join(', '));
}
console.log(dupes ? `\n${dupes} page(s) with duplicates` : '\nno duplicates');
