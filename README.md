# İsa Məmmədli — Portfolio

Personal portfolio of a front-end developer: a scroll-driven single page with a pinned hero, a 3D tech ring, a full-screen project showcase and a 3D skills corridor. Languages: Azerbaijani (default), English, Russian.

**Stack:** Vite · React 19 · TypeScript (strict) · Tailwind CSS v4 · `motion` (scroll-linked animation) · Lenis (smooth scroll) · TanStack Query · react-hook-form · i18next · Vitest.

## Run

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Type-check and production build into `dist/` |
| `npm run lint` | ESLint |
| `npm run test:run` | Unit tests |

## Where things live

| What | Where |
|---|---|
| Texts (AZ / EN / RU) | `src/i18n/locales/<AZ\|EN\|RU>/home.json`, `projects.json`, `common.json` |
| Projects, skills, links, tech ring | `src/constants/portfolio/index.ts` |
| Project screenshots | `public/projects/*.webp` |
| CV file | `public/cv.pdf` |
| Colours and type | `src/index.css` (`--brand`, `--background`, fonts) |
| Contact form | `src/api/contact.api.ts`, `src/hooks/contact`, `src/pages/client/HomePage/widgets/Contact` |

## Contact form

Messages go through [FormSubmit](https://formsubmit.co) to the e-mail in `CONTACT_EMAIL`. The first submitted message sends an activation e-mail to that inbox; click "Activate Form" once. To use another service, copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT`.

## Structure

`api → hooks → pages/widgets`, same layering as the NextCook project:

```
src/
  api/          axios client and the contact request
  hooks/        React Query mutation wrappers and app hooks
  constants/    routes, endpoints, content lists (projects, skills, links)
  helpers/      pure functions with tests beside them
  i18n/         AZ / EN / RU translations
  layout/       MainLayout: loader, grain, navigation, smooth scroll
  pages/client/HomePage/widgets/   one folder per scroll scene
  widgets/      shared pieces (Loader, Reveal, SectionHead…)
```

## Deploy

**Vercel:** import the repository; the framework is detected from `vercel.json`. No environment variables are required.
**Docker:** `docker compose up --build` serves the build with nginx on port 3000.
