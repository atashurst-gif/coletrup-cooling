#!/usr/bin/env node
/**
 * NETLIFY REDIRECTS — runs after `astro build` (see package.json "build").
 *
 * Netlify serves a production site at BOTH the primary custom domain and the
 * <site-name>.netlify.app address, and does not redirect the latter itself. Two live
 * copies of every page is bad for SEO, so on a production build with a custom
 * primary domain this writes dist/_redirects with a domain-level 301:
 *
 *   https://<site-name>.netlify.app/*  →  https://<primary domain>/:splat  301!
 *
 * Nothing is written when: not on Netlify, not the production context, or no custom
 * domain yet (the primary URL is still the .netlify.app one — a redirect would loop).
 * Deploy previews / branch deploys keep their own addresses (they are noindex anyway).
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const { CONTEXT, URL: siteUrl, SITE_NAME } = process.env;

if (!existsSync(dist)) {
  console.error('netlify-redirects: dist/ not found');
  process.exit(1);
}
if (CONTEXT !== 'production' || !siteUrl || !SITE_NAME) {
  console.log('netlify-redirects: not a Netlify production build — nothing to do');
  process.exit(0);
}
const primary = siteUrl.trim().replace(/\/+$/, '');
const host = new URL(primary).host;
if (host.endsWith('.netlify.app')) {
  console.log(`netlify-redirects: primary domain is still ${host} — no custom domain yet, nothing to do`);
  process.exit(0);
}
const rule = `https://${SITE_NAME}.netlify.app/* ${primary}/:splat 301!\n`;
writeFileSync(join(dist, '_redirects'), `# Generated at build time: send the .netlify.app address to the live domain (SEO: one URL per page)\n${rule}`);
console.log(`netlify-redirects: wrote dist/_redirects → ${rule.trim()}`);
