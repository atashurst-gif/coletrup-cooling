/**
 * OFFLINE PREVIEW BUNDLE — a copy of the site that opens straight from a folder
 * (double-click index.html), no web server needed.
 *  • relative links & asset paths
 *  • module scripts bundled + inlined (browsers block module scripts on file://)
 *  • latin web fonts inlined as data URIs (browsers block fonts on file://)
 *  • quote form simulates success (built with PREVIEW_MODE=1)
 */
import { readFileSync, writeFileSync, readdirSync, statSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';
import { buildSync } from 'esbuild';

const root = new URL('..', import.meta.url).pathname;
const src = join(root, 'dist-offline-src');
const out = join(root, 'dist-offline');
rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true });

const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); } })(out);
const htmls = files.filter((f) => f.endsWith('.html') && basename(f) !== '404.html');

const fontCache = new Map();
const fontData = (rel) => {
  if (!fontCache.has(rel)) fontCache.set(rel, `data:font/woff2;base64,${readFileSync(join(out, rel)).toString('base64')}`);
  return fontCache.get(rel);
};
const jsCache = new Map();
const bundle = (rel) => {
  if (!jsCache.has(rel)) {
    const r = buildSync({ entryPoints: [join(out, rel)], bundle: true, format: 'iife', minify: true, write: false, target: 'es2019', logLevel: 'silent' });
    jsCache.set(rel, r.outputFiles[0].text);
  }
  return jsCache.get(rel);
};

for (const file of htmls) {
  const rel = relative(out, file).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  const prefix = '../'.repeat(depth);
  let html = readFileSync(file, 'utf8');

  // 1) absolute → relative
  html = html.replace(/\b(href|src|content|action)="(\/[^"]*)"/g, (m, a, path) => {
    const [, base, rest = ''] = path.match(/^([^?#]*)([?#].*)?$/);
    if (base === '/') return `${a}="${prefix}index.html${rest}"`;
    if (/\.[A-Za-z0-9]+$/.test(base)) return `${a}="${prefix}${base.slice(1)}${rest}"`;
    if (base.endsWith('/')) return `${a}="${prefix}${base.slice(1)}index.html${rest}"`;
    return m;
  });
  html = html.replace(/srcset="([^"]*)"/g, (m, v) => `srcset="${v.replace(/(^|,\s*)\//g, `$1${prefix}`)}"`);
  html = html.replace(/url\(\//g, `url(${prefix}`);

  // 2) inline latin fonts as data URIs; drop other subsets' preloads
  html = html.replace(/url\((\.\.\/)*assets\/(montserrat|open-sans)-latin-wght-normal\.[^)]+\.woff2\)/g, (m) => {
    const relPath = m.replace(/^url\((\.\.\/)*/, '').replace(/\)$/, '');
    return `url(${fontData(relPath)})`;
  });
  html = html.replace(/<link rel="preload" href="[^"]*\.woff2" as="font"[^>]*>/g, '');

  // 3) bundle + inline module scripts
  html = html.replace(/<script type="module" src="([^"]+\.js)"><\/script>/g, (m, s) => {
    const relPath = s.replace(/^(\.\.\/)*/, '');
    return `<script>${bundle(relPath)}</script>`;
  });
  html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');
  writeFileSync(file, html);
}
// remove now-unneeded js files & server-only files
for (const f of files) if (/\.(js|xml|txt)$/.test(f) || basename(f) === '_headers' || basename(f) === '404.html') rmSync(f);
writeFileSync(join(out, 'OPEN-ME-index.html.txt'), 'Double-click index.html to open the preview in your browser.\nAll pages work offline. The quote form is simulated (nothing is sent).\n');
console.log(`offline bundle: ${htmls.length} pages → ${relative(root, out)}`);
