# Coletrup Cooling — Website

**Keeping It Cool.** Static, production-ready website built with [Astro](https://astro.build) 7.
Zero client-side framework, ~30 KB of JS per page, AVIF/WebP responsive images, self-hosted fonts.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # runs content audit → builds to dist/ → runs post-build checks
npm run preview
```

**Requires Node ≥ 20.19.** The `build` script refuses to produce a site containing any refrigeration-installation phrasing, guarantees, response-time or accreditation claims (see `tools/content-audit.mjs`).

`npm run build:strict` additionally fails until every verified fact below has been supplied — use it as the go-live gate.

## 1. Fill in the verified facts (one file)

Everything factual lives in **`src/config/site.config.mjs`**. Nothing else needs editing to go live.

| Key | What to enter |
| --- | --- |
| `url` | Live domain, e.g. `https://www.coletrupcooling.co.uk`. Until set, every page is **noindex** and robots.txt disallows crawling (safe for previews). On Netlify the production URL is picked up automatically. |
| `brand.*` | The approved **Logo 1** is in `public/brand/` as a true vector (`coletrup-cooling-logo.svg`, plus a white-lettered `-reversed.svg` and PNG renders for social/schema/favicons). It was rebuilt from the supplied raster by `tools/make-logo-svg.py` — mark traced, lettering re-set in the artwork's typeface at the artwork's letter positions, colours sampled — so it is the same lockup, crisp at any size. If a master vector file is ever supplied, drop it in and point `logoSvg` at it. |
| `contact.phoneDisplay` / `phoneE164` | `0161 000 0000` / `+441610000000` |
| `contact.whatsapp` | Digits with country code, e.g. `447700900000` |
| `contact.email`, `contact.openingHours`, `contact.address` | As appropriate. Leave `address` null for a service-area business. |
| `company.*` | Registered name, company number, registered office (footer + legal pages + schema). |
| `region` | `confirmed: true` once "the North West" is verified. Change `phrase` to update every use of it. |
| `areas[]` | Set `confirmed: true` only for towns genuinely served. Add `intro` + ≥3 unique `details` to generate `/areas-we-cover/<slug>/` for that town. **No location page is built without unique content.** |
| `reviews[]` | Genuine reviews only (`quote, name, location, service, source, sourceUrl, date`). |
| `reviewProfile` | Public review profile link, e.g. Google. |
| `accreditations[]` | Only accreditations currently held. |
| `socials` | Profile URLs (rendered in the footer when present). |
| `analytics` | `gtmId`, `ga4Id`, `metaPixelId`, `googleAdsId` (+ lead conversion label). Tags load **only after cookie consent**. |
| `forms` | `provider: 'netlify'` (default, zero setup on Netlify), `'webhook'` (Zapier/Make/CRM URL), or `'none'`. |

Placeholders on the site are visibly marked `[LIKE THIS]` and listed by `npm run audit:content`.

## 2. Deploy (Netlify)

`netlify.toml` already holds the build settings (build `npm run build`, publish `dist`, Node 22); `public/_headers` sets caching and security headers.

1. Push this folder to a GitHub repo (`.gitignore` keeps `node_modules/` and `dist/` out).
2. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo → **Deploy** (settings are pre-filled from `netlify.toml`).
3. **Site configuration → Forms → Enable form detection**, then **Deploys → Trigger deploy**. The quote form then appears under *Forms → quote*; add an email notification under *Forms → Form notifications*. Each submission carries `enquiry_id`, `service`, `customer_type`, `postcode`, `name`, `phone`, `email`, UTM fields, `landing_page`, `referrer`, `submitted_from`, `submitted_at`.
4. **Domain management → Add a domain** → follow the DNS records Netlify shows → **HTTPS → Provision certificate** → set the primary domain (`www` or bare; Netlify 301s the other and the `.netlify.app` address to it) → **Trigger deploy** once more so canonicals and the sitemap carry the live domain.

Every push to `main` rebuilds and goes live; the content audit and post-build checks run first, so a bad change fails the deploy instead of publishing.

### SEO on launch

- The live URL is picked up from Netlify automatically (`URL` = the primary domain). Setting `url` in `site.config.mjs` pins it explicitly and also makes local builds indexable.
- Only the **production** deploy is indexable: deploy previews and branch deploys build with `noindex` and `Disallow: /` (see `src/lib/site.ts`).
- `/robots.txt`, `/sitemap-index.xml`, canonicals, Open Graph and LocalBusiness/Service schema are generated at build time — nothing to add by hand.
- After the domain is live: Google Search Console → add the domain property → submit `https://<domain>/sitemap-index.xml`; link the site from the Google Business Profile; Bing Webmaster Tools → import from Search Console.
- Fill `contact`, `company`, `region`/`areas` and `accreditations` in `site.config.mjs` — the schema and area pages only carry what is confirmed there.
- Keep the page URLs (slugs) fixed after launch; add a redirect in `netlify.toml` if one ever has to change.

Any other static host works too (Vercel, Cloudflare Pages, S3): upload `dist/` built with `url` set. Set `forms.provider` to `'webhook'` with your endpoint if not on Netlify.

## 3. Photos — one photo per page, matched to its section

**Rule:** every photo appears on exactly one page (and once on it). `node tools/image-audit.mjs` runs as part of `npm run build` and fails the build if a photo is repeated anywhere. Decorative graphics (`coletrup-airflow-graphic*`) are exempt. Uniform rule: engineers indoors wear the shirt; outdoors and around fridges/freezers/cold rooms they wear the black coat.

Where each photo lives (key in `src/lib/images.ts` → page/section):

| Page | Photos |
| --- | --- |
| Home | hero `livingRoomBifold` · selector `engineerHomeDark` / `officeBoardroom` / `supermarketChillers` · residential `openPlanLiving` · commercial `outdoorTablet` · refrigeration `fridgeGaugesCoat` · maintenance `maintenanceChecklist` · trust `van` |
| Residential | hero `engineerInstallDiningDark` · rooms `bedroom` `livingRoom` `homeOffice` `gardenRoom` `kitchenDiner` `thermostat` |
| Installation | hero `outdoorElectrical` |
| Repairs | hero `engineerOutdoorGauges` |
| Servicing | hero `engineerFilterCleanDark` · split `outdoorFan` |
| Commercial hub | hero `commercialCassetteInstallDark` · split `restaurantCassette` |
| Commercial repairs | hero `commercialRooftopGauges` |
| Commercial maintenance | hero `commercialOfficeFilter` |
| Refrigeration hub | hero `coldRoomEngineer` |
| Fridge & freezer | hero `engineerGauges` |
| Cold rooms | hero `coldRoom` |
| Display fridges | hero `displayFridges` |
| Planned maintenance | hero `commercialRestaurantCheckDark` |
| About | hero `engineerPortrait` · story/trust: graphics until a team photo is supplied |
| Areas / location pages | the animated North West map (no photo) |

Sections that currently show a branded icon panel instead of a photo (a photo slots straight in — add it to `images.ts` and set `image:` on the section in `services.mjs`): Residential "Start to finish"; Installation "Keep it performing"; Repairs "Servicing helps spot issues early"; Commercial repairs "Reduce the risk of repeat faults"; Commercial maintenance "AC and refrigeration together"; Refrigeration hub, Fridge & freezer, Cold rooms, Display fridges and Planned maintenance splits; the link cards on the Residential, Commercial and Refrigeration hubs and the Installation/Planned duos are icon-only.

Drop new photos into `src/assets/images/` with descriptive SEO filenames (`what-is-happening-where.jpg`, ≥1400 px wide, JPEG), register them in `src/lib/images.ts` with honest alt text, then rebuild — the audit tells you if anything repeats. Retired variants (navy uniform, outdoor polo) are in `tools/photo-originals/retired/`; originals of everything in use are in `tools/photo-originals/`.

## 4. Editing copy

- **Service pages:** `src/data/services.mjs` — one object per page (hero, sections, FAQs, related links, CTA). Section types: `intro`, `features`, `checklist`, `links`, `split`, `steps`, `duo`, `callout`.
- **Homepage:** `src/pages/index.astro`.
- **Navigation/footer:** `src/data/navigation.mjs`.
- **Legal pages:** `src/pages/privacy-policy.astro`, `cookie-policy.astro`, `terms.astro` — structural drafts, must be completed and approved before launch (they are noindex and excluded from the sitemap).

House rule enforced by the build: **refrigeration is servicing, maintenance, fault finding and repairs only.**

## 5. Tracking

`src/lib/tracking.ts` pushes to `window.dataLayer` (GTM) and `gtag` (GA4) and fires Meta `Lead`/`Contact` and Google Ads conversions when configured.

| Event | Fired when | Params |
| --- | --- | --- |
| `quote_form_start` | First interaction with the form | `enquiry_id` |
| `quote_form_step` | Each step completed | `step`, `value` |
| `quote_form_complete` | Successful submission | `enquiry_id`, `service`, `customer_type`, `postcode_area` |
| `whatsapp_click` / `phone_click` | Any WhatsApp / phone link | `location` |
| `cta_click` | Any CTA | `cta` ∈ residential, commercial, repair, maintenance, refrigeration, installation, quote; `location` |

Every event also carries `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, `landing_page`, `referrer`. Attribution persists across pages only after consent (`attribution.storeBeforeConsent`).

If you use GTM, configure GA4/Meta/Ads **inside GTM** and leave the other IDs blank to avoid double-counting.

## 6. Project structure

```
src/
  config/site.config.mjs   ← all business facts, analytics, forms
  data/services.mjs        ← service page content
  data/navigation.mjs
  layouts/BaseLayout.astro, LegalLayout.astro
  components/  Header, MobileMenu, Logo, Button, Icon, Hero, PageHero, ServiceSelector,
               ServiceCards, ImageTextSection, BenefitsGrid, ProcessSteps, FeatureSection,
               SectionRenderer, FAQ, RelatedServices, ReviewSection, AreasSection,
               QuoteForm, FinalCTA, StickyLeadBar, CookieBanner, Footer, Breadcrumbs,
               SEOHead, Placeholder
  lib/  site.ts (derived helpers) · images.ts · tracking.ts · consent.ts · quote-form.ts
  pages/  index · [slug] (12 service pages) · about · areas-we-cover/ · contact ·
          privacy-policy · cookie-policy · terms · 404 · robots.txt.ts
  styles/global.css        ← design tokens & utilities
  data/uk-map.json         ← map geometry (built by tools/map/build-uk.py from ONS boundaries)
tools/
  content-audit.mjs  (pre-build)   netlify-redirects.mjs · check-build.mjs (post-build)
  image-audit.mjs (post-build: one photo per page) · imgcheck.mjs (every <img> decodes)
  e2e.mjs · a11y.mjs · lh.mjs · shoot.mjs · snap-hero.mjs   (QA scripts, need dev deps)
  make-logo-svg.py   (vector logo from tools/logo-source/)   map/build-uk.py (UK map data)
  photo-originals/branded/  (the four branded photos supplied 30 Sep — van, rooftop, home, gauges — as used on the site)
  clean-photos.py + upscale.py  (superseded: logo-free versions of the earlier small photos; originals in tools/photo-originals/)
public/  favicon, app icons, manifest, _headers, brand/ (logo SVGs + PNG renders)
```

## 7. QA scripts

```bash
node tools/e2e.mjs    # form journey, tracking, menus, sticky bar, overflow (Playwright)
node tools/a11y.mjs   # axe-core WCAG 2.1 AA on 9 pages × 2 viewports
node tools/lh.mjs     # Lighthouse (mobile + desktop)
```
