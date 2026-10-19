// Refreshes project screenshots in src/assets/projects from the live demos listed in src/data/projects.json.
// Usage: pnpm screenshots            (all projects)
//        pnpm screenshots social-ease (one project id)
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src/assets/projects');
const only = process.argv[2];
const projects = JSON.parse(await readFile(path.join(root, 'src/data/projects.json'), 'utf8'));

const browser = await chromium.launch();
for (const project of projects) {
  if (only && project.id !== only) continue;
  if (!project.links?.live) continue;
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.5,
    colorScheme: 'dark',
  });
  try {
    await page.goto(project.links.live, { waitUntil: 'load', timeout: 45_000 });
    await page.waitForTimeout(4_000);
    await page.screenshot({ path: path.join(outDir, `${project.id}.png`) });
    console.log('ok  ', project.id, '-', await page.title());
  } catch (error) {
    console.log('FAIL', project.id, '-', error.message.split('\n')[0]);
  } finally {
    await page.close();
  }
}
await browser.close();
