import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import site from '../../src/data/site.json' with { type: 'json' };
import projects from '../../src/data/projects.json' with { type: 'json' };
import writing from '../../src/data/writing.json' with { type: 'json' };

const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
};

/** Scrolls the whole page so every scroll-reveal section becomes visible. */
async function revealAll(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await expect(page.locator('[data-reveal]:not(.is-visible)')).toHaveCount(0);
}

test('home renders every section from the JSON data', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  await expect(page).toHaveTitle(site.seo.title);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.hero.headline);
  for (const section of Object.values(site.sections)) {
    await expect(page.locator(`section#${section.id} h2`)).toHaveText(section.title);
  }
  await expect(page.locator('#projects article')).toHaveCount(projects.length);
  await expect(page.locator('#writing li')).toHaveCount(writing.length);
  await expect(page.getByText('{years}')).toHaveCount(0);
  await revealAll(page);
  expect(errors).toEqual([]);
});

test('SEO metadata and structured data are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${site.url}/`);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${site.url}/og.png`);
  const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}');
  expect(jsonLd['@graph'][0]).toMatchObject({ '@type': 'Person', name: site.name, jobTitle: site.role });
});

test('generated assets are served', async ({ request }) => {
  for (const path of [
    '/og.png',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/robots.txt',
    '/sitemap-index.xml',
    '/site.webmanifest',
    site.resume.href,
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

for (const theme of ['light', 'dark'] as const) {
  test(`no accessibility violations in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    await page.goto('/');
    await revealAll(page);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}

test('theme toggle switches and persists across reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: site.ui.themeToggle }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('mobile menu navigates and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  await page.getByRole('button', { name: site.ui.menu }).click();
  const menu = page.locator('#mobile-nav');
  await expect(menu).toBeVisible();
  await menu.getByRole('link', { name: 'Writing' }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#writing$/);
});

test('unknown routes show the 404 page', async ({ page }) => {
  const response = await page.goto('/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.notFound.title);
});

test('hero is fully visible straight away with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const opacity = await page
    .getByRole('heading', { level: 1 })
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe('1');
});

test('experience path fills and lights each stop as you scroll', async ({ page }) => {
  await page.goto('/');
  const timeline = page.locator('[data-timeline]');
  const progress = () => timeline.evaluate((el) => Number(el.style.getPropertyValue('--progress')));
  expect(await progress()).toBe(0);
  const stops = await timeline.locator('[data-stop]').count();
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 250) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  await expect.poll(progress).toBe(1);
  await expect(timeline.locator('[data-stop][data-active]')).toHaveCount(stops);
});

test('scroll progress bar tracks the page', async ({ page }) => {
  await page.goto('/');
  const bar = page.locator('[data-scroll-progress]');
  // Rendered width relative to the viewport, so any CSS that also scales the bar is caught.
  const scale = () =>
    bar.evaluate((el) => el.getBoundingClientRect().width / document.documentElement.clientWidth);
  expect(await scale()).toBe(0);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'instant' }));
  await expect.poll(scale).toBeGreaterThan(0.3);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await expect.poll(scale).toBeCloseTo(1, 2);
});
