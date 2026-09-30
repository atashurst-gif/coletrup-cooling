#!/usr/bin/env node
/**
 * POST-BUILD CHECK — runs after `astro build`.
 *  • Exactly one <h1> per page, <title> + meta description present
 *  • No "refrigeration installation" phrasing in any built HTML (incl. metadata)
 *  • Every <img> has alt (empty allowed for decorative)
 *  • Internal links resolve to a built page
 *  • robots.txt and sitemap present
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
if (!existsSync(dist)) {
  console.error('dist/ not found');
  process.exit(1);
}
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(dist);

const routes = new Set(
  pages.map((p) => {
    const rel = '/' + relative(dist, p).replace(/\\/g, '/');
    return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
  }),
);
const errors = [];
const banned = /refrigeration\s+(installation|install|installs|installed|installer|replacement)|install(?:ation|ed|s|ing)?\s+(?:of\s+)?(?:new\s+)?(?:commercial\s+)?(?:refrigeration|cold\s*rooms?|display\s+fridges?|fridges?|freezers?)/i;
const allow = /does\s+not\s+offer\s+refrigeration\s+installation/i;

for (const p of pages) {
  const rel = '/' + relative(dist, p).replace(/\\/g, '/');
  const html = readFileSync(p, 'utf8');
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '');
  const h1s = (text.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1> elements (expected 1)`);
  if (!/<title>[^<]{5,}<\/title>/.test(html)) errors.push(`${rel}: missing <title>`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) errors.push(`${rel}: missing meta description`);
  const stripped = text.replace(/<[^>]+>/g, ' ');
  const m = stripped.match(banned);
  if (m && !allow.test(stripped)) errors.push(`${rel}: banned phrase "${m[0]}"`);
  const metaTitleDesc = (html.match(/<title>[^<]*<\/title>|content="[^"]*"/g) || []).join(' ');
  if (banned.test(metaTitleDesc)) errors.push(`${rel}: banned phrase in metadata`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt(=|\s|>)/.test(img)) errors.push(`${rel}: <img> without alt: ${img.slice(0, 80)}`);
  }
  for (const link of html.match(/href="(\/[^"#?]*)/g) || []) {
    const href = link.slice(6);
    if (/\.(xml|txt|svg|png|jpg|webp|avif|css|js|webmanifest|ico)$/.test(href)) continue;
    if (href.startsWith('/assets/') || href.startsWith('/brand/')) continue;
    const norm = href.endsWith('/') ? href : href + '/';
    if (!routes.has(norm) && !routes.has(href)) errors.push(`${rel}: broken internal link ${href}`);
  }
}
if (!existsSync(join(dist, 'robots.txt'))) errors.push('robots.txt missing');
if (!existsSync(join(dist, 'sitemap-index.xml'))) errors.push('sitemap-index.xml missing');

console.log(`Build check: ${pages.length} pages`);
if (errors.length) {
  errors.forEach((e) => console.error('  ✖ ' + e));
  process.exit(1);
}
console.log('  ✔ one H1 per page, titles & descriptions present, alt text present, internal links resolve, no refrigeration-installation phrasing.');
