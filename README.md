# Sharath Nair · Portfolio

Personal site for Sharath Nair, senior frontend engineer. Live at [sharath-nair.vercel.app](https://sharath-nair.vercel.app).

Built with [Astro](https://astro.build) and Tailwind CSS v4. The output is fully static, with no CMS and very little client JavaScript.

## Editing content

All copy and data live in [`src/data`](src/data). Components never hard-code content.

| File              | What it holds                                                              |
| ----------------- | -------------------------------------------------------------------------- |
| `site.json`       | Name, contact details, SEO, hero, about, trivia, section titles, UI labels |
| `experience.json` | Jobs, with optional nested client engagements                              |
| `projects.json`   | Project cards; `image` is a file in `src/assets/projects`                  |
| `skills.json`     | Skill groups for the Toolbox section                                       |
| `writing.json`    | Blog posts                                                                 |
| `education.json`  | Degrees                                                                    |

Every file is validated against a Zod schema in [`src/lib/schemas.ts`](src/lib/schemas.ts) when the site builds, so a typo or missing field fails the build with a clear message. Entries render in the order they appear in each file.

`{years}` in any copy is replaced with whole years since `careerStart`, so the bio never goes stale.

To refresh project screenshots from the live demos, run `pnpm screenshots`, or `pnpm screenshots social-ease` for one project.

The resume lives at `public/Sharath_Nair_Resume.pdf`.

## Development

Requires Node 22.22 or newer (see `.nvmrc`) and pnpm.

```sh
nvm use
pnpm install
pnpm dev
```

| Command         | What it does                                                   |
| --------------- | -------------------------------------------------------------- |
| `pnpm build`    | Builds the static site into `dist/`                            |
| `pnpm check`    | Type-checks Astro and TypeScript files                         |
| `pnpm lint`     | Runs ESLint                                                    |
| `pnpm format`   | Formats with Prettier                                          |
| `pnpm test`     | Runs unit tests for content and helpers                        |
| `pnpm test:e2e` | Runs Playwright smoke and axe accessibility tests on the build |
| `pnpm verify`   | Runs everything above in order                                 |

CI runs the same steps plus Lighthouse budgets on every push and pull request.

## What gets generated at build time

- `og.png`, the social preview card, rendered from `site.json` with Satori.
- Favicons, the Apple touch icon and the web manifest.
- `sitemap-index.xml` and `robots.txt`.
- JSON-LD `Person` and `WebSite` structured data in every page head.

## Moving to a CMS later

Collections are defined in [`src/content.config.ts`](src/content.config.ts) with Astro's `file()` loader. Switching to a CMS means replacing those loaders. Components only see typed entries and do not need to change.
