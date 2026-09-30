/**
 * TRACKING LAYER
 * ---------------------------------------------------------------------
 * Pushes structured events to window.dataLayer (GTM) and gtag (GA4), and
 * fires Meta Pixel / Google Ads conversions when configured. Tags load only
 * after cookie consent. Nothing here contains real IDs — they come from
 * site.config.mjs → analytics.
 *
 * Events:
 *   quote_form_start      { enquiry_id }
 *   quote_form_step       { step, value }
 *   quote_form_complete   { enquiry_id, service, customer_type, postcode_area }
 *   whatsapp_click        { location }
 *   phone_click           { location }
 *   cta_click             { cta: residential|commercial|repair|maintenance|refrigeration|installation|quote, location }
 * Every event carries attribution: utm_source, utm_medium, utm_campaign,
 * utm_term, utm_content, landing_page, referrer.
 * ---------------------------------------------------------------------
 */
import { getConsent } from './consent';

type Analytics = {
  gtmId: string;
  ga4Id: string;
  metaPixelId: string;
  googleAdsId: string;
  googleAdsLeadLabel: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ccTrack: (event: string, params?: Record<string, unknown>) => void;
    ccAttribution: () => Record<string, string>;
  }
}

const ATTR_KEY = 'cc_attribution_v1';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

function readStored(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}');
  } catch {
    return {};
  }
}

/** Capture UTMs / landing page / referrer. Persisted across pages after consent (or if storeBeforeConsent). */
export function captureAttribution(storeBeforeConsent: boolean): Record<string, string> {
  const url = new URL(location.href);
  const fresh: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = url.searchParams.get(k);
    if (v) fresh[k] = v.slice(0, 200);
  });
  const stored = readStored();
  const hasFreshUtm = Object.keys(fresh).length > 0;
  const attribution: Record<string, string> = hasFreshUtm
    ? { ...fresh, landing_page: url.pathname + url.search, referrer: document.referrer || '' }
    : Object.keys(stored).length
      ? stored
      : { landing_page: url.pathname + url.search, referrer: document.referrer || '' };

  const mayStore = storeBeforeConsent || getConsent() === true;
  if (mayStore) {
    try {
      sessionStorage.setItem(ATTR_KEY, JSON.stringify(attribution));
    } catch {}
  }
  return attribution;
}

let attribution: Record<string, string> = {};
let cfg: Analytics;
let loaded = false;

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadTags() {
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];

  if (cfg.gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(cfg.gtmId)}`);
  }
  if (cfg.ga4Id || cfg.googleAdsId) {
    const first = cfg.ga4Id || cfg.googleAdsId;
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(first)}`);
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    if (cfg.ga4Id) window.gtag('config', cfg.ga4Id, { anonymize_ip: true });
    if (cfg.googleAdsId) window.gtag('config', cfg.googleAdsId);
  }
  if (cfg.metaPixelId) {
    /* Meta Pixel base code */
    // prettier-ignore
    (function(f: any,b,e,v,n?: any,t?: any,s?: any){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq?.('init', cfg.metaPixelId);
    window.fbq?.('track', 'PageView');
  }
}

function track(event: string, params: Record<string, unknown> = {}) {
  const payload = { event, ...attribution, ...params, page_path: location.pathname };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (window.gtag && cfg.ga4Id) window.gtag('event', event, { ...attribution, ...params });

  if (event === 'quote_form_complete') {
    if (window.fbq) window.fbq('track', 'Lead', { content_name: 'quote_form' });
    if (window.gtag && cfg.googleAdsId && cfg.googleAdsLeadLabel)
      window.gtag('event', 'conversion', { send_to: `${cfg.googleAdsId}/${cfg.googleAdsLeadLabel}` });
  }
  if (event === 'whatsapp_click' || event === 'phone_click') {
    if (window.fbq) window.fbq('track', 'Contact', { method: event.replace('_click', '') });
  }
}

export function initTracking(analytics: Analytics, storeBeforeConsent: boolean) {
  cfg = analytics;
  attribution = captureAttribution(storeBeforeConsent);
  window.dataLayer = window.dataLayer || [];
  window.ccTrack = track;
  window.ccAttribution = () => ({ ...attribution });

  if (getConsent() === true) loadTags();
  window.addEventListener('cc:consent', (e) => {
    const granted = (e as CustomEvent).detail?.granted;
    if (granted) {
      attribution = captureAttribution(storeBeforeConsent);
      loadTags();
    }
  });

  // Delegated CTA tracking. Any element with data-track="cta" data-cta="…"
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-track="cta"]');
      if (!el) return;
      const cta = el.dataset.cta || 'unknown';
      const locationName = el.dataset.location || el.closest('section')?.id || 'page';
      if (cta === 'whatsapp') track('whatsapp_click', { location: locationName });
      else if (cta === 'phone') track('phone_click', { location: locationName });
      else track('cta_click', { cta, location: locationName });
    },
    { capture: true },
  );
}
