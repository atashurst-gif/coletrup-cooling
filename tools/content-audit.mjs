#!/usr/bin/env node
/**
 * CONTENT AUDIT — runs before every build.
 * 1. Lists every VERIFIED fact still missing from site.config.mjs (placeholders live on the site).
 * 2. Scans all source copy for banned claims: refrigeration installation, invented
 *    guarantees, response times, certifications, prices, etc.
 * `STRICT_CONTENT=1` (npm run build:strict) fails the build on any missing item or banned term.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import siteConfig from '../src/config/site.config.mjs';

const root = new URL('..', import.meta.url).pathname;
const strict = process.env.STRICT_CONTENT === '1';
const missing = [];
const warnings = [];

const c = siteConfig;
const need = (cond, label) => !cond && missing.push(label);

need(c.url, 'Live site URL (site.config → url) — site is NOINDEX until set');
need(c.brand.logoOnLight, 'Approved Logo 1 file (brand.logoOnLight) — interim text wordmark showing');
if (!c.brand.logoSvg) warnings.push('No vector logo (brand.logoSvg) — PNG fallback in use');
need(c.contact.phoneDisplay && c.contact.phoneE164, 'Phone number (contact.phoneDisplay + phoneE164)');
need(c.contact.whatsapp, 'WhatsApp number (contact.whatsapp)');
need(c.contact.email, 'Email address (contact.email)');
need(c.company.registeredName, 'Registered company name (company.registeredName)');
need(c.company.companyNumber, 'Company registration number (company.companyNumber)');
need(c.company.registeredOffice, 'Registered office address (company.registeredOffice)');
need(c.region.confirmed, `Service region "${c.region.name}" not marked confirmed (region.confirmed)`);
need(c.areas.some((a) => a.confirmed), 'No confirmed service areas (areas[].confirmed) — no areas listed, no location pages built');
need(c.reviews.length, 'Genuine customer reviews (reviews) — placeholders showing');
if (!c.accreditations.length) warnings.push('No accreditations listed (accreditations) — placeholder showing. Only add ones currently held.');
if (!c.contact.openingHours.length) warnings.push('Opening hours not supplied (contact.openingHours) — optional');
need(c.analytics.gtmId || c.analytics.ga4Id, 'Analytics IDs (analytics.gtmId / ga4Id) — tracking layer active but no tags load');
if (c.forms.provider === 'webhook' && !c.forms.webhookUrl) missing.push('forms.webhookUrl is empty while provider is "webhook" — quote form disabled');
if (c.forms.provider === 'none') warnings.push('forms.provider is "none" — online quote form disabled');
c.areas.filter((a) => a.confirmed && !(a.intro && a.details?.length >= 3)).forEach((a) =>
  warnings.push(`Area "${a.name}" is confirmed but has no unique content — listed, but no location page generated`),
);

// ---- Banned / risky copy scan --------------------------------------------
const banned = [
  { re: /refrigeration\s+(installation|install|installs|installed|installer|replacement|supply|supplied)/i, why: 'REFRIGERATION INSTALLATION IS NOT OFFERED' },
  { re: /install(?:ation|ed|s|ing)?\s+(?:of\s+)?(?:new\s+)?(?:commercial\s+)?(?:refrigeration|cold\s*rooms?|display\s+fridges?|fridges?|freezers?)/i, why: 'implies refrigeration installation' },
  { re: /\b(?:fridges?|freezers?|cold\s*rooms?|display\s+fridges?|refrigeration)\b[^.]{0,60}\b(?:installed|installation|install|replace|replacement|supply)\b/i, why: 'implies refrigeration installation/replacement' },
  { re: /\b(24\/7|24 hours?|same[- ]day|next[- ]day|within \d+ (hours?|minutes?|days?)|emergency call[- ]?out|rapid response)\b/i, why: 'response-time claim' },
  { re: /\b(guarantee[ds]?|warranty|warranties)\b/i, why: 'guarantee/warranty claim' },
  { re: /\b(F-?Gas|REFCOM|Gas Safe|NICEIC|Checkatrade|Trustpilot|Which\? Trusted|accredited|certified|approved installer|registered installer)\b/i, why: 'accreditation claim' },
  { re: /\b(Daikin|Mitsubishi|Fujitsu|Panasonic|LG|Toshiba|Samsung|Hitachi|Gree|Midea)\b/, why: 'manufacturer name' },
  { re: /\b(£\s?\d|from \d+ per|finance available|0% finance|interest[- ]free|price match)\b/i, why: 'price/finance claim' },
  { re: /\b(\d+\+?\s*years?['’]?\s*(?:of\s+)?experience|since\s+(?:19|20)\d{2}|established\s+(?:19|20)\d{2}|family[- ]run|\d+\s*(?:happy|satisfied)\s*customers|5[- ]star|five[- ]star|rated\s+\d)\b/i, why: 'years/customers/rating claim' },
  { re: /\b(save (?:up to )?\d+%|reduce(?:s|d)? (?:your )?(?:energy )?bills|extend(?:s)? (?:the )?life(?:span)?|lower(?:s)? running costs)\b/i, why: 'unverified saving/lifespan claim' },
];
const allowlist = [/does\s+not\s+offer\s+refrigeration\s+installation/i, /no\s+refrigeration\s+installation/i, /never\s+add\s+refrigeration\s+installation/i];

const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(astro|mjs|ts|md)$/.test(f)) files.push(p);
  }
})(join(root, 'src'));

const hits = [];
for (const f of files) {
  const rel = relative(root, f);
  if (rel.endsWith('content-audit.mjs')) continue;
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*|<!--)/.test(line)) return; // comments
    if (allowlist.some((a) => a.test(line))) return;
    for (const b of banned) {
      if (b.re.test(line)) hits.push(`${rel}:${i + 1} — ${b.why}: "${line.trim().slice(0, 110)}"`);
    }
  });
}

// ---- Report ------------------------------------------------------------------
const hr = '─'.repeat(72);
console.log(`\n${hr}\nCOLETRUP COOLING — CONTENT AUDIT${strict ? ' (STRICT)' : ''}\n${hr}`);
if (missing.length) {
  console.log(`\n✖ ${missing.length} verified item(s) still MISSING (placeholders are showing on the site):`);
  missing.forEach((m) => console.log(`   • ${m}`));
} else console.log('\n✔ All required verified content supplied.');
if (warnings.length) {
  console.log(`\n! ${warnings.length} note(s):`);
  warnings.forEach((w) => console.log(`   • ${w}`));
}
if (hits.length) {
  console.log(`\n✖ ${hits.length} BANNED / RISKY phrase(s) found in copy:`);
  hits.forEach((h) => console.log(`   • ${h}`));
} else console.log('\n✔ Copy scan clean: no refrigeration installation, guarantees, response times, accreditations, prices or brand names.');
console.log(hr + '\n');

if (strict && (missing.length || hits.length)) {
  console.error('STRICT_CONTENT=1 — failing build until the items above are resolved.');
  process.exit(1);
}
if (hits.length) {
  console.error('Banned phrases must be fixed before publishing.');
  process.exit(1);
}
