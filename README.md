# Humelixa

Marketing site + lead capture flow for a German real estate consulting brand aimed at international professionals.

This is an Astro app with React islands. Most of the site is static, content-driven landing-page stuff. The only real application flow is the multi-step suitability form, which validates user input, runs Cloudflare Turnstile, and stores submissions in Google Sheets through an Astro API route running on Cloudflare Pages.

## What This Repo Actually Does

- Renders the public marketing site at `/`
- Opens Cal.com booking modals from CTA buttons
- Runs a 5-step suitability wizard at `/suitability-check`
- Persists in-progress wizard answers in `localStorage`
- Submits qualified lead data to a Google Sheet through `/api/submit`
- Deploys to Cloudflare Pages

## Stack

- Astro 5
- React 19 islands inside Astro pages
- TypeScript
- Tailwind CSS 4
- Base UI primitives + shadcn-style wrappers
- Jotai for local form persistence
- Zod for validation
- Cloudflare Pages adapter for Astro
- Cal.com embed for consultation booking
- Cloudflare Turnstile for bot protection
- Google Sheets API for lead storage

## Runtime Flow

### 1. Landing page

`src/pages/index.astro` composes the homepage out of mostly static Astro sections:

- `hero`
- `narrative`
- `services`
- `testimonials`
- `metrics`
- `process`
- `comparison`
- `cta`

The page uses [`src/layouts/main.astro`](./src/layouts/main.astro), which injects global styles, the React navigation bar, the footer, and a tiny Intersection Observer script for reveal animations.

### 2. Booking flow

The CTA buttons use [`src/components/cal-button.tsx`](./src/components/cal-button.tsx). Clicking one opens a Cal.com modal for `zidan-abraham/30min`.

### 3. Suitability check

`/suitability-check` mounts [`src/features/suitability/components/wizard.tsx`](./src/features/suitability/components/wizard.tsx) as a client-side React island.

The wizard flow is:

1. Goals + timeline
2. Financial profile
3. Residence + employment situation
4. SCHUFA status
5. Contact details + Turnstile

Form state lives in a Jotai `atomWithStorage` store at [`src/features/suitability/store.ts`](./src/features/suitability/store.ts), so refreshing the page does not instantly nuke progress. The current step is also mirrored to the URL hash.

Validation is split like this:

- Full schema: [`src/features/suitability/schema.ts`](./src/features/suitability/schema.ts)
- Per-step schema slices: same file, `stepSchemas`
- UI labels/options: [`src/features/suitability/types.ts`](./src/features/suitability/types.ts)

### 4. Submission pipeline

When the last step submits:

1. The wizard calls `submitToGoogleSheets()` from [`src/features/suitability/api.ts`](./src/features/suitability/api.ts)
2. That POSTs JSON to `/api/submit`
3. [`src/pages/api/submit.ts`](./src/pages/api/submit.ts) validates the payload with Zod
4. The API verifies the Turnstile token against Cloudflare
5. The API signs a Google service-account JWT manually using Web Crypto
6. The API exchanges that JWT for an OAuth access token
7. The API appends a row to `Submissions!A:M` in the configured Google Sheet
8. The wizard swaps to a success screen

The row shape is:

- timestamp
- name
- email
- phone
- goals
- timeline
- useEquity
- netIncome
- investWith
- residenceStatus
- employmentStatus
- employmentType
- schufaEntries

## Project Structure

```text
src/
  components/                 Marketing sections, navigation, footer, UI primitives
  features/suitability/       Multi-step qualification flow
    components/steps/         One React component per wizard step
    api.ts                    Client submit helper
    schema.ts                 Zod schema + step schemas
    store.ts                  Jotai localStorage persistence
    types.ts                  Option lists shown in the UI
  layouts/
    main.astro                Global page shell
  pages/
    index.astro               Homepage
    suitability-check/        Wizard entry page
    api/submit.ts             Lead submission endpoint
    robots.txt.ts             Dynamic robots.txt
  index.css                   Tailwind import + theme tokens + global utilities
public/
  fonts/                      Local brand fonts
.github/workflows/deploy.yml  Cloudflare Pages deploy on push to main
wrangler.jsonc                Cloudflare Pages config
```

## Local Development

### Prerequisites

- Node.js 22
- pnpm 10

### Install

```bash
pnpm install
```

### Environment setup

There are two env buckets here:

- `.env` for public build-time values used by Astro/React
- `.dev.vars` for server-side secrets when running the Cloudflare Pages runtime locally

Start from the examples:

```bash
cp .env.example .env
cp .dev.vars.example .dev.vars
```

Required variables:

| Variable | Where it is used | Needed for |
| --- | --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | client form step | rendering Turnstile |
| `TURNSTILE_SECRET_KEY` | `/api/submit` | Turnstile verification |
| `GOOGLE_PRIVATE_KEY` | `/api/submit` | Google OAuth JWT signing |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `/api/submit` | Google OAuth |
| `SPREADSHEET_ID` | `/api/submit` | Google Sheets append target |

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Standard Astro dev server. Fine for UI work. |
| `pnpm build` | Production build to `dist/`. |
| `pnpm start` | Preview the built Astro site. |
| `pnpm start:cf` | Build and run the Cloudflare Pages runtime locally. Use this if you need `/api/submit` to behave like production. |
| `pnpm lint` | Lint `src/` |
| `pnpm lint:fix` | Lint with autofix |
| `pnpm format` | Prettier on `src/` |
| `pnpm check` | Format then lint |
| `pnpm deploy` | Build and deploy to Cloudflare Pages via Wrangler |

## Editing Guide

### Marketing content

Most homepage copy is hardcoded directly inside Astro components under [`src/components`](./src/components). There is no CMS. If you want to change messaging, edit the component files.

### Form logic

If you change the suitability flow, you usually need to touch all three:

- [`src/features/suitability/schema.ts`](./src/features/suitability/schema.ts)
- One or more files in [`src/features/suitability/components/steps`](./src/features/suitability/components/steps)
- [`src/pages/api/submit.ts`](./src/pages/api/submit.ts) if the Google Sheets row shape changes

Miss one of those and the whole thing gets weird fast.

### Styling

Global tokens, fonts, color variables, and utility classes live in [`src/index.css`](./src/index.css). The site uses local IBM Plex + Source Serif fonts from `public/fonts/`.

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

The deploy job:

1. Installs dependencies with pnpm
2. Builds the Astro app
3. Deploys `dist/` to Cloudflare Pages using Wrangler

Production needs these GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `PUBLIC_TURNSTILE_SITE_KEY`

The server-side secrets for the API route should be configured in Cloudflare Pages environment variables.

## Notable Repo Quirks

- `README.md` existed before, then got deleted. So yeah, this is the replacement.
- There are dormant components like `property-calculator.tsx`, `portfolio.astro`, and `header.astro` that are currently not mounted on the homepage.
- There are no automated tests in this repo right now.
- `service-credentials.json` exists in the repo root, but the live code uses env vars, not that file. Treat credential files like radioactive waste and keep them out of git.

## If You Need to Onboard Fast

Read these in order:

1. [`src/pages/index.astro`](./src/pages/index.astro)
2. [`src/layouts/main.astro`](./src/layouts/main.astro)
3. [`src/pages/suitability-check/index.astro`](./src/pages/suitability-check/index.astro)
4. [`src/features/suitability/components/wizard.tsx`](./src/features/suitability/components/wizard.tsx)
5. [`src/features/suitability/schema.ts`](./src/features/suitability/schema.ts)
6. [`src/pages/api/submit.ts`](./src/pages/api/submit.ts)

That gives you the whole app without the fluff.
