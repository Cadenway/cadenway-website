#!/usr/bin/env node
/**
 * Writes `sitemap.xml` and `robots.txt` next to the prerendered pages, as the last step of
 * `pnpm build`.
 *
 * Both files need the public address of the site, which belongs to the environment: it is read from
 * `SITE_URL` (for example `https://www.example.org`). Without it the step is skipped, so a local
 * build still succeeds; the release build always sets it.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/waypoint-website/', import.meta.url));
const routesFile = `${dist}prerendered-routes.json`;
const siteUrl = process.env.SITE_URL?.replace(/\/+$/, '');

if (siteUrl === undefined || siteUrl === '') {
  console.log('SITE_URL is not set: sitemap.xml and robots.txt are not generated.');
  process.exit(0);
}
if (!existsSync(routesFile)) {
  console.error(`${routesFile} is missing: run the build before generating the sitemap.`);
  process.exit(1);
}

const { routes } = JSON.parse(readFileSync(routesFile, 'utf8'));
const urls = Object.keys(routes)
  .sort()
  .map((route) => `  <url><loc>${siteUrl}${route === '/' ? '/' : route}</loc></url>`);

writeFileSync(
  `${dist}browser/sitemap.xml`,
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n'),
);
writeFileSync(
  `${dist}browser/robots.txt`,
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n'),
);
console.log(`sitemap.xml lists ${String(urls.length)} page(s) of ${siteUrl}.`);
