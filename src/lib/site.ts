/**
 * Site helpers — derived values from site.config (never edit facts here).
 */
import siteConfig from '../config/site.config.mjs';

export const site = siteConfig;

/**
 * Resolve the public site URL: config → Netlify's main site URL (`URL`, which becomes the
 * primary custom domain once one is set) → '' (preview/noindex mode).
 * Canonicals, the sitemap and schema always point at the LIVE domain, even from a
 * deploy preview or branch deploy, so duplicate URLs are never advertised to Google.
 */
export function resolveSiteUrl(): string {
  const cfg = (siteConfig.url || '').trim().replace(/\/+$/, '');
  if (cfg) return cfg;
  return (process.env.URL || '').trim().replace(/\/+$/, '');
}

export const SITE_URL = resolveSiteUrl();
/** PREVIEW_MODE=1 at build time: quote form simulates a successful send (no backend). */
export const PREVIEW_MODE = process.env.PREVIEW_MODE === '1';
/** Netlify sets CONTEXT to production | deploy-preview | branch-deploy | dev. Only production is indexable. */
export const BUILD_CONTEXT = process.env.CONTEXT || 'production';
export const IS_INDEXABLE = Boolean(SITE_URL) && BUILD_CONTEXT === 'production';

export const hasPhone = Boolean(siteConfig.contact.phoneE164 && siteConfig.contact.phoneDisplay);
export const hasWhatsApp = Boolean(siteConfig.contact.whatsapp);
export const hasEmail = Boolean(siteConfig.contact.email);
export const hasLogo = Boolean(siteConfig.brand.logoOnLight);
export const hasCompanyDetails = Boolean(siteConfig.company.registeredName || siteConfig.company.companyNumber || siteConfig.company.registeredOffice);

/** Until a phone number is supplied, "Call us" goes to the contact page. */
export const telHref = hasPhone ? `tel:${siteConfig.contact.phoneE164}` : '/contact/';

export function whatsappHref(message?: string): string {
  if (!hasWhatsApp) return '/contact/'; // until a WhatsApp number is supplied
  const base = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage = "Hi Coletrup Cooling, I'd like to ask about air conditioning.";

export const confirmedAreas = siteConfig.areas.filter((a) => a.confirmed);
/** Areas that can have their own page: confirmed AND with unique content. */
export const areaPages = confirmedAreas.filter((a) => a.intro && a.details && a.details.length >= 3);

export function absoluteUrl(path: string): string {
  if (!SITE_URL) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Deterministic tracking attributes for CTA elements. */
export function ctaAttrs(kind: string, extra: Record<string, string> = {}) {
  return { 'data-track': 'cta', 'data-cta': kind, ...extra };
}
