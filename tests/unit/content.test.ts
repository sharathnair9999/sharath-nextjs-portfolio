import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { z } from 'astro/zod';
import site from '../../src/data/site.json';
import experience from '../../src/data/experience.json';
import projects from '../../src/data/projects.json';
import skills from '../../src/data/skills.json';
import writing from '../../src/data/writing.json';
import education from '../../src/data/education.json';
import {
  educationSchema,
  experienceSchema,
  projectSchema,
  siteSchema,
  skillGroupSchema,
  writingSchema,
} from '../../src/lib/schemas';
import { sortKey } from '../../src/lib/dates';

const collections = [
  ['experience', experience, experienceSchema],
  ['projects', projects, projectSchema],
  ['skills', skills, skillGroupSchema],
  ['writing', writing, writingSchema],
  ['education', education, educationSchema],
] as const;

describe('content JSON', () => {
  it('canonical URLs drop index.html and .html', async () => {
    const { canonicalUrl } = await import('../../src/lib/site');
    expect(canonicalUrl('/index.html')).toBe(`${site.url}/`);
    expect(canonicalUrl('/')).toBe(`${site.url}/`);
    expect(canonicalUrl('/404.html')).toBe(`${site.url}/404`);
  });

  it('site.json matches its schema', () => {
    expect(() => siteSchema.parse(site)).not.toThrow();
  });

  it.each(collections)('%s.json matches its schema and has unique ids', (_, data, schema) => {
    const parsed = z.array(schema as z.ZodType<{ id: string }>).parse(data);
    const ids = parsed.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every project screenshot exists in src/assets/projects', () => {
    for (const project of projects) {
      expect(existsSync(path.resolve('src/assets/projects', project.image)), project.image).toBe(true);
    }
  });

  it('says "that\'s what she said" exactly once across the whole site', () => {
    const all = JSON.stringify([site, experience, projects, skills, writing, education]).toLowerCase();
    expect(all.split("that's what she said").length - 1).toBe(1);
  });

  it('the avatar exists in src/assets', () => {
    expect(existsSync(path.resolve('src/assets', site.avatar.src))).toBe(true);
  });

  it('experience dates never end before they start', () => {
    const ranges = experience.flatMap((job) => [job, ...(job.engagements ?? [])]);
    for (const { start, end } of ranges) {
      expect(sortKey(end).localeCompare(start.padEnd(7, '-01')), `${start} – ${end}`).toBeGreaterThanOrEqual(
        0,
      );
    }
  });

  it('only the current job is open-ended', () => {
    expect(experience.filter((job) => job.end === null)).toHaveLength(1);
  });

  it('in-page nav links point at real section ids', () => {
    const ids = Object.values(site.sections).map((s) => s.id);
    for (const item of site.nav) {
      const hash = item.href.split('#')[1];
      if (hash) expect(ids).toContain(hash);
    }
  });
});
