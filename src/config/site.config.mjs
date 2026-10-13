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
  url: 'https://coletrupcooling.co.uk',

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
    /** Display format (business mobile, also on WhatsApp — supplied 8 Oct 2026) */
    phoneDisplay: '07367 751704',
    /** International format for tel: links */
    phoneE164: '+447367751704',
    /** WhatsApp number, digits only with country code */
    whatsapp: '447367751704',
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
    confirmed: true,
  },

  /**
   * Towns / areas. NOTHING is displayed and NO location page is generated
   * unless confirmed: true. Each confirmed area also needs unique content
   * (intro + details) or its page is skipped — never publish pages where
   * only the town name changes.
   * The four below are named in the strategy documents but are NOT confirmed.
   */
  areas: [
    // Confirmed by the owner 13 Oct 2026. Pages are linked from the footer only (showAreasOnSite: false).
    { name: 'Stockport', slug: 'stockport', confirmed: true, lat: 53.4106, lon: -2.1575, intro: 'Air conditioning installation, servicing and repairs for homes and businesses in Stockport, from family homes and home offices to shops, offices and commercial premises across the town.', details: ['Home air conditioning for bedrooms, living spaces and home offices, with a free survey to recommend the right system for your property.', 'Commercial air conditioning installation, servicing and repairs for offices, retail units and new or refurbished workplaces across Stockport.', 'Refrigeration repairs and maintenance for local shops, bars, restaurants and food businesses, including display fridges, cellar cooling and cold rooms.'] },
    { name: 'Altrincham', slug: 'altrincham', confirmed: true, lat: 53.3838, lon: -2.3547, intro: 'Home air conditioning for Altrincham properties, from bedrooms and living rooms to kitchen-diners and home offices, plus air conditioning and refrigeration support for local businesses.', details: ['Discreet wall-mounted systems positioned and finished to suit your home, with a free survey before any work starts.', 'Systems that keep rooms cool in summer and provide efficient heating in the cooler months.', 'Air conditioning for shops, salons, restaurants and offices in and around the town centre, with servicing and repairs to keep them running reliably.'] },
    { name: 'Sale', slug: 'sale', confirmed: true, lat: 53.4246, lon: -2.3218, intro: 'Air conditioning for homes and businesses in Sale, including older properties where unit positions and pipe routes need careful planning.', details: ['Home air conditioning installation with the indoor unit, outdoor unit and pipework planned around your property, not the other way round.', 'Servicing and repairs for existing systems, including fault finding on units that have stopped cooling or heating properly.', 'Commercial air conditioning and refrigeration repairs for local shops, offices and hospitality businesses.'] },
    { name: 'Bolton', slug: 'bolton', confirmed: true, lat: 53.5769, lon: -2.4282, intro: 'Commercial and residential air conditioning across Bolton, covering offices, retail units, warehouses and industrial premises as well as homes.', details: ['Commercial air conditioning installation, servicing and repairs for offices, shops and industrial units.', 'Planned maintenance and service contracts to help reduce unexpected breakdowns on business-critical systems.', 'Refrigeration repairs and maintenance for food retail, hospitality and commercial kitchens, alongside home air conditioning for Bolton homeowners.'] },
    { name: 'Oldham', slug: 'oldham', confirmed: true, lat: 53.5409, lon: -2.1114, intro: 'Air conditioning and refrigeration support for Oldham businesses on industrial estates, in converted mill buildings and on the high street, plus home air conditioning across the borough.', details: ['Commercial air conditioning servicing, maintenance and repairs for workshops, offices and industrial units.', 'Refrigeration repairs and maintenance for shops, supermarkets, bars and food businesses, including display cabinets, cold rooms and cellar cooling.', 'Home air conditioning installation, servicing and repairs, with a free survey to recommend the right system.'] },
    { name: 'Rochdale', slug: 'rochdale', confirmed: true, lat: 53.6097, lon: -2.1561, intro: 'Air conditioning installation, servicing and repairs for Rochdale businesses and homes, from commercial and industrial premises to newer residential areas.', details: ['Commercial air conditioning for offices, retail and industrial premises, with servicing and repairs to keep systems running.', 'Home air conditioning for bedrooms, living rooms and home offices, planned around your property.', 'Refrigeration repairs and maintenance for local shops, takeaways, pubs and food businesses.'] },
    { name: 'Bury', slug: 'bury', confirmed: true, lat: 53.5933, lon: -2.2966, intro: 'Air conditioning and refrigeration services for Bury homes, shops and businesses, from the town centre to the surrounding residential areas.', details: ['Air conditioning for retail, hospitality and office premises, with installation, servicing and repairs.', 'Refrigeration repairs and maintenance for food retailers, bars and restaurants, including display fridges and cellar cooling.', 'Home air conditioning that cools in summer and heats efficiently in winter, with a free survey before installation.'] },
    { name: 'Stretford', slug: 'stretford', confirmed: true, lat: 53.4466, lon: -2.3087, intro: 'Air conditioning and refrigeration support for homes and businesses in Stretford, including businesses in and around Trafford Park.', details: ['Commercial air conditioning installation, servicing and repairs for offices, venues and industrial premises.', 'Refrigeration repairs and maintenance for hospitality, catering and food businesses.', 'Home air conditioning for bedrooms, living spaces and home offices across Stretford.'] },
    { name: 'Eccles', slug: 'eccles', confirmed: true, lat: 53.4824, lon: -2.339, intro: 'Air conditioning installation, servicing and repairs in Eccles, on Salford\'s doorstep, for homes, shops and local businesses.', details: ['Home air conditioning for houses and apartments, with unit positions and pipe routes planned to suit your property.', 'Air conditioning for shops, offices and retail units, with servicing and repairs to keep them comfortable all year.', 'Refrigeration repairs and maintenance for local shops, cafés, bars and restaurants.'] },
    { name: 'Ashton-under-Lyne', slug: 'ashton-under-lyne', confirmed: true, lat: 53.488, lon: -2.098, intro: 'Air conditioning and refrigeration services across Ashton-under-Lyne and the wider Tameside area, for businesses, shops and homes.', details: ['Commercial air conditioning installation, servicing and repairs for offices, retail and public-facing premises.', 'Refrigeration repairs and maintenance for supermarkets, convenience stores, bars and food businesses.', 'Home air conditioning installation, servicing and repairs, with a free survey to recommend the right system.'] },
  ],

  /** false = towns are not listed on the Areas page / homepage / map; they appear only as footer links to their own pages. */
  showAreasOnSite: false,

  /**
   * GENUINE customer reviews only. Never write or paraphrase reviews.
   * (5 Oct 2026: the engineer's first name was taken out of the dance studio review at the
   * owner's request — two words deleted, nothing added.)
   * { quote, name, location?, service?, source?, sourceUrl?, date? }
   * With no reviews the site shows [GENUINE CUSTOMER REVIEW TO BE ADDED].
   */
  reviews: [
    {
      quote:
        'We recently had Coletrup Cooling out to service the air conditioning systems at our dance studio. Professional, friendly and did a really thorough job, including a deep clean of the units.\n\nEverything was left clean and tidy and the air conditioning is working great. Really pleased with the service and would definitely recommend Coletrup Cooling. We’ll be using them again for our future servicing and maintenance.',
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
