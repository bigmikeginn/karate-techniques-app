# Jitsu-Do Techniques Library

A lightweight student reference app for Jitsu-Do Karate and Brazilian Jiu-Jitsu techniques.

The intended production home is `https://app.jitsudo.ca`.

## Features

- Separate Karate and BJJ libraries behind a shared discipline toggle
- Search, category filtering, technique cards, and detail modal on one fast interface
- 14 Karate categories and 9 BJJ categories
- Responsive desktop, tablet, and mobile layout
- SEO metadata, sitemap, robots file, app manifest, and Open Graph image
- Production security headers configured in `next.config.ts`
- Browser smoke test for key student flows

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Playwright for browser smoke checks

## Project Shape

```text
src/
  app/
    layout.tsx        Root metadata and app shell
    page.tsx          Main student library interface
    manifest.ts       Web app manifest
    sitemap.ts        Canonical sitemap for app.jitsudo.ca
  components/
    footer.tsx
  data/
    techniques.json
    bjj-techniques.json
    disciplines.ts
    technique_descriptions.ts
    technique_translations.ts
  lib/
    categoryColors.ts
  types/
    technique.ts
scripts/
  browser-smoke.js
  update-data.js
  convert-csv-to-json.js
public/
  karate-logo.png
  jitsudo-og.jpg
  robots.txt
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

Run the standard checks before deploying:

```bash
npm run lint
npm run build
npm run test:browser
```

To test a deployed URL:

```bash
$env:TEST_URL="https://karate-techniques-app.vercel.app"; npm run test:browser
```

## Data

Karate data comes from the CSV workflow in `scripts/update-data.js`.

BJJ data lives in `src/data/bjj-techniques.json` and uses the same structure so both disciplines share the same UI.

## Deployment Notes

The current Vercel URL is temporary while the app is prepared for its intended canonical domain:

- Temporary: `https://karate-techniques-app.vercel.app`
- Canonical: `https://app.jitsudo.ca`

The sitemap, robots file, canonical URL, and Open Graph metadata intentionally point to `app.jitsudo.ca`.
