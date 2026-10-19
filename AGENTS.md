## Project notes

- Content lives only in `src/data/*.json`, validated by `src/lib/schemas.ts`. Never hard-code copy, labels or links in components; add a field to the JSON and the schema instead.
- TechMojo is the employer and ROSHN is a client. Keep that framing in all copy.
- Node 22.22+ is required (`.nvmrc` pins 24).
- Before committing, run `pnpm verify` (type-check, lint, format, unit tests, build, Playwright and axe).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`. Preview servers share a lock file; pass `--ignore-lock` to run a second one.

## Documentation

Full documentation: https://docs.astro.build

- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Fonts](https://docs.astro.build/en/guides/fonts/)
- [View transitions](https://docs.astro.build/en/guides/view-transitions/)
