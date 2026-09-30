import type { APIRoute } from 'astro';
import { SITE_URL, IS_INDEXABLE, BUILD_CONTEXT } from '../lib/site';

export const GET: APIRoute = () => {
  const why = !SITE_URL
    ? 'Site URL not configured yet (site.config.mjs → url). Preview builds are not indexable.'
    : `${BUILD_CONTEXT} build — only the production deploy is indexable.`;
  const body = IS_INDEXABLE
    ? `User-agent: *\nAllow: /\nDisallow: /privacy-policy/\nDisallow: /cookie-policy/\nDisallow: /terms/\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`
    : `# ${why}\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
