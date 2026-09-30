// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import siteConfig from './src/config/site.config.mjs';

/**
 * Public URL: site.config → Netlify's main site URL (`URL`, = the primary custom domain once
 * set) → placeholder (build stays NOINDEX until one is available). Mirrors src/lib/site.ts.
 */
const configured = (siteConfig.url || '').trim().replace(/\/+$/, '');
const site = configured || (process.env.URL || '').trim().replace(/\/+$/, '') || 'https://example.invalid';

export default defineConfig({
  site,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
    assets: 'assets',
  },
  image: {
    // High-quality responsive images; sharp is Astro's default service
    responsiveStyles: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(privacy-policy|cookie-policy|terms|404)\/?$/.test(page),
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') item.priority = 1.0;
        else if (path === '/residential-air-conditioning/' || path === '/contact/') item.priority = 0.9;
        else if (/^\/(air-conditioning-|commercial-air-conditioning)/.test(path)) item.priority = 0.8;
        return item;
      },
    }),
  ],
  vite: {
    build: { cssMinify: true },
  },
});
