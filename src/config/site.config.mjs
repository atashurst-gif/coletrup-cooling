/**
 * COLETRUP COOLING — SITE CONFIGURATION
 * =====================================================================
 * This is the ONE place to edit business facts. Everything on the site
 * (header, footer, schema, WhatsApp/phone links, analytics, forms, areas,
 * reviews, accreditations) reads from here.
 *
 * RULE: only enter VERIFIED information. Anything left blank is simply left OFF the
 * site (no placeholder is shown — owner decision, 5 Oct 2026) and is listed by
 * `npm run audit:content`. `npm run build:strict` fails until every
 * required item is filled in.
 * =====================================================================
 */

/** @type {SiteConfig} */
const siteConfig = {
  name: 'Coletrup Cooling',
  strapline: 'Keeping It Cool',

  /**
   * Live domain, no trailing slash, e.g. 'https://www.example.co.uk'.
   * Used for canonical URLs, sitemap.xml, robots.txt and schema.
   * On Netlify, the production site URL is used automatically if left blank.
   * If no URL is available the build is marked NOINDEX (safe preview mode).
   */
  url: '',

  brand: {
    /**
     * Approved "Logo 1" (supplied 29 Sep 2026). The supplied file was a raster, so the
     * artwork has been rebuilt as a true vector (tools/make-logo-svg.py): the mark is traced
     * from the artwork and the lettering re-set in the artwork's own typeface at the artwork's
     * own letter positions, with colours sampled from it — so it is the same lockup, crisp at
     * any size. Files in /public/brand/:
     *  - logoSvg:         the complete lockup (mark, COLETRUP COOLING, AIR CONDITIONING | REFRIGERATION,
     *                     KEEPING IT COOL) — used everywhere the logo appears
     *  - logoSvgReversed: the same lockup with the navy lettering in white, for navy backgrounds
     *  - logoFull / logoFullSmall / logoMark: PNG renders of the vector for social previews,
     *                     structured data and favicons
     */
    logoSvg: '/brand/coletrup-cooling-logo.svg',
    logoSvgReversed: '/brand/coletrup-cooling-logo-reversed.svg',
    logoSvgWidth: 1026, // viewBox of the SVGs
    logoSvgHeight: 899,
    logoOnLight: '/brand/coletrup-cooling-logo.svg',
    logoOnDark: '/brand/coletrup-cooling-logo-reversed.svg',
    logoWidth: 1026,
    logoHeight: 899,
    logoFull: '/brand/coletrup-cooling-logo-450.png',
    logoFullWidth: 514,
    logoFullHeight: 450,
    logoFullSmall: '/brand/coletrup-cooling-logo-200.png',
    logoMark: '/brand/coletrup-cooling-mark-256.png',
    logoMarkSvg: '/brand/coletrup-cooling-mark.svg',
  },

  contact: {
    /** Display format, e.g. '0161 000 0000' — TO BE SUPPLIED */
    phoneDisplay: '',
    /** International format for tel: links, e.g. '+441610000000' — TO BE SUPPLIED */
    phoneE164: '',
    /** WhatsApp number, digits only with country code, e.g. '447700900000' — TO BE SUPPLIED */
    whatsapp: '',
    /** Enquiries email */
    email: 'info@coletrupcooling.co.uk',
    /** Opening hours as display lines, e.g. ['Mon–Fri 8:00–17:30'] — TO BE SUPPLIED (optional) */
    openingHours: [],
    /**
     * Business address — only if it should be published. Leave null for a
     * service-area business with no public premises.
     * { streetAddress, addressLocality, addressRegion, postalCode }
     */
    address: null,
  },

  company: {
    /** e.g. 'Coletrup Cooling Ltd' — TO BE SUPPLIED */
    registeredName: '',
    /** Companies House number — TO BE SUPPLIED */
    companyNumber: '',
    /** Registered office address (single line) — TO BE SUPPLIED */
    registeredOffice: '',
    /** VAT number — optional */
    vatNumber: '',
  },

  /**
   * Service region. "the North West" appears in the approved hero and
   * Areas copy. Set confirmed: true once verified — until then the content
   * audit keeps flagging it. Change `name`/`phrase` here to update every use.
   */
  region: {
    name: 'North West',
    phrase: 'across the North West',
    confirmed: false,
  },

  /**
   * Towns / areas. NOTHING is displayed and NO location page is generated
   * unless confirmed: true. Each confirmed area also needs unique content
   * (intro + details) or its page is skipped — never publish pages where
   * only the town name changes.
   * The four below are named in the strategy documents but are NOT confirmed.
   */
  areas: [
    // lat/lon place a pin on the North West map once the area is confirmed
    { name: 'Manchester', slug: 'manchester', confirmed: false, lat: 53.4808, lon: -2.2426, intro: '', details: [] },
    { name: 'Stockport', slug: 'stockport', confirmed: false, lat: 53.4106, lon: -2.1575, intro: '', details: [] },
    { name: 'Cheshire', slug: 'cheshire', confirmed: false, lat: 53.2, lon: -2.52, intro: '', details: [] },
    { name: 'Lancashire', slug: 'lancashire', confirmed: false, lat: 53.83, lon: -2.65, intro: '', details: [] },
  ],

  /**
   * GENUINE customer reviews only. Never write or paraphrase reviews.
   * { quote, name, location?, service?, source?, sourceUrl?, date? }
   * With no reviews the site shows [GENUINE CUSTOMER REVIEW TO BE ADDED].
   */
  reviews: [
    {
      quote:
        'We recently had Coletrup Cooling out to service the air conditioning systems at our dance studio. Brad was professional, friendly and did a really thorough job, including a deep clean of the units.\n\nEverything was left clean and tidy and the air conditioning is working great. Really pleased with the service and would definitely recommend Coletrup Cooling. We’ll be using them again for our future servicing and maintenance.',
      name: 'Dance studio',
      service: 'Air conditioning servicing',
      stars: 5,
    },
  ],

  /** Public review profile, e.g. { label: 'Google', url: 'https://…' } — optional */
  reviewProfile: null,

  /**
   * Accreditations CURRENTLY HELD and verifiable only.
   * { name, logo?: '/brand/…', number?, verifyUrl? }
   */
  accreditations: [
    { name: 'REFCOM', logo: '/brand/accreditations/refcom.png', width: 421, height: 168 },
    { name: 'City & Guilds', logo: '/brand/accreditations/city-and-guilds.png', width: 276, height: 167 },
  ],

  /** Social profile URLs — optional */
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61593608505132',
    instagram: 'https://www.instagram.com/coletrupcooling/',
    linkedin: '',
    google: '',
  },

  /**
   * ANALYTICS — paste real IDs only. Nothing loads until a visitor accepts
   * analytics cookies. If you use GTM, configure GA4/Meta/Ads inside GTM
   * and leave the other IDs blank to avoid double counting.
   */
  analytics: {
    gtmId: '', // 'GTM-XXXXXXX'
    ga4Id: '', // 'G-XXXXXXXXXX'
    metaPixelId: '', // '000000000000000'
    googleAdsId: '', // 'AW-000000000'
    googleAdsLeadLabel: '', // conversion label for completed quote forms
  },

  /**
   * QUOTE FORM DESTINATION
   * provider: 'netlify' — Netlify Forms (works automatically on Netlify)
   *           'webhook' — POST to webhookUrl (Zapier, Make, Formspree, CRM)
   *           'none'    — online submission disabled (form shows call/WhatsApp)
   */
  forms: {
    provider: 'netlify',
    netlifyFormName: 'quote',
    netlifyPostPath: '/',
    webhookUrl: '',
    /** Prefix for generated enquiry references, e.g. CC-260929-K7M4Q */
    referencePrefix: 'CC',
  },

  /**
   * UTM / landing page / referrer capture.
   * storeBeforeConsent: false — attribution is only kept across pages after
   * the visitor accepts cookies (UTMs on the page where the form is submitted
   * are always captured). Set true only if your privacy advice permits.
   */
  attribution: {
    storeBeforeConsent: false,
  },
};

export default siteConfig;

/**
 * @typedef {Object} SiteConfig
 * @property {string} name
 * @property {string} strapline
 * @property {string} url
 * @property {{logoOnLight:string, logoOnDark:string, logoWidth:number, logoHeight:number, logoFull:string, logoFullWidth:number, logoFullHeight:number, logoFullSmall:string, logoMark:string}} brand
 * @property {{phoneDisplay:string, phoneE164:string, whatsapp:string, email:string, openingHours:string[], address:null|{streetAddress:string,addressLocality:string,addressRegion:string,postalCode:string}}} contact
 * @property {{registeredName:string, companyNumber:string, registeredOffice:string, vatNumber:string}} company
 * @property {{name:string, phrase:string, confirmed:boolean}} region
 * @property {{name:string, slug:string, confirmed:boolean, lat?:number, lon?:number, intro:string, details:string[]}[]} areas
 * @property {{quote:string, name:string, location?:string, service?:string, source?:string, sourceUrl?:string, date?:string}[]} reviews
 * @property {null|{label:string,url:string}} reviewProfile
 * @property {{name:string, logo?:string, number?:string, verifyUrl?:string}[]} accreditations
 * @property {{facebook:string, instagram:string, linkedin:string, google:string}} socials
 * @property {{gtmId:string, ga4Id:string, metaPixelId:string, googleAdsId:string, googleAdsLeadLabel:string}} analytics
 * @property {{provider:'netlify'|'webhook'|'none', netlifyFormName:string, netlifyPostPath:string, webhookUrl:string, referencePrefix:string}} forms
 * @property {{storeBeforeConsent:boolean}} attribution
 */
