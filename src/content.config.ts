import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  educationSchema,
  experienceSchema,
  projectSchema,
  skillGroupSchema,
  writingSchema,
} from './lib/schemas';

// Every collection reads a JSON array from src/data. Each entry gets an `order` field from its
// position in the file, so reordering the JSON reorders the page. Swapping to a CMS later means
// replacing these loaders; components only see typed entries.
const fromJson = (path: string) =>
  file(path, {
    parser: (text) =>
      (JSON.parse(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })),
  });
const withOrder = <T extends z.ZodType>(schema: T) => z.intersection(schema, z.object({ order: z.number() }));

const experience = defineCollection({
  loader: fromJson('src/data/experience.json'),
  schema: withOrder(experienceSchema),
});
const projects = defineCollection({
  loader: fromJson('src/data/projects.json'),
  schema: withOrder(projectSchema),
});
const skills = defineCollection({
  loader: fromJson('src/data/skills.json'),
  schema: withOrder(skillGroupSchema),
});
const writing = defineCollection({
  loader: fromJson('src/data/writing.json'),
  schema: withOrder(writingSchema),
});
const education = defineCollection({
  loader: fromJson('src/data/education.json'),
  schema: withOrder(educationSchema),
});

export const collections = { experience, projects, skills, writing, education };
