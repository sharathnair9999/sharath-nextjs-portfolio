import { z } from 'astro/zod';

/** "YYYY" or "YYYY-MM". Year-only is allowed where the source only gives a year. */
export const partialDate = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Use "YYYY" or "YYYY-MM"');

const link = z.object({ label: z.string().min(1), href: z.string().min(1) });
const section = z.object({
  id: z.string().regex(/^[a-z-]+$/),
  eyebrow: z.string(),
  title: z.string().min(1),
  intro: z.string().optional(),
});

export const siteSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  role: z.string().min(1),
  url: z.url(),
  locale: z.string(),
  lang: z.string(),
  location: z.string(),
  careerStart: partialDate,
  email: z.email(),
  currentCompany: z.string(),
  resume: link,
  avatar: z.object({ src: z.string(), alt: z.string().min(1) }),
  seo: z.object({
    title: z.string().min(1).max(70),
    description: z.string().min(50).max(170),
    keywords: z.array(z.string()),
    twitterHandle: z.string().startsWith('@').optional(),
  }),
  hero: z.object({
    greeting: z.string(),
    headline: z.string(),
    intro: z.string(),
    status: z.string().optional(),
    primaryCta: link,
    secondaryCta: link,
  }),
  about: z.object({ paragraphs: z.array(z.string().min(1)).min(1) }),
  trivia: z.object({
    title: z.string(),
    items: z.array(z.object({ emoji: z.string(), label: z.string(), text: z.string().max(140) })).min(1),
  }),
  sections: z.object({
    about: section,
    experience: section,
    projects: section,
    skills: section,
    writing: section,
    contact: section,
  }),
  contact: z.object({
    headline: z.string(),
    body: z.string(),
    emailLabel: z.string(),
    locationLabel: z.string(),
  }),
  nav: z.array(link).min(1),
  socials: z.array(
    z.object({
      id: z.enum(['github', 'linkedin', 'x', 'blog', 'email']),
      label: z.string(),
      handle: z.string(),
      href: z.url(),
    }),
  ),
  notFound: z.object({ title: z.string(), body: z.string(), cta: z.string() }),
  // Every UI label is listed so a missing or misspelled key fails the build.
  ui: z.strictObject({
    skipLink: z.string().min(1),
    themeToggle: z.string().min(1),
    menu: z.string().min(1),
    present: z.string().min(1),
    liveDemo: z.string().min(1),
    sourceCode: z.string().min(1),
    readOnBlog: z.string().min(1),
    minRead: z.string().min(1),
    copyEmail: z.string().min(1),
    copied: z.string().min(1),
    backToTop: z.string().min(1),
    education: z.string().min(1),
    resumeFormat: z.string().min(1),
    screenshotAlt: z.string().min(1),
    newTab: z.string().min(1),
    primaryNav: z.string().min(1),
    mobileNav: z.string().min(1),
    client: z.string().min(1),
  }),
  footer: z.object({ note: z.string(), source: link }),
});

const highlights = z.array(z.string().min(1)).min(1);
const stack = z.array(z.string().min(1));

export const engagementSchema = z.object({
  id: z.string(),
  name: z.string(),
  client: z.string().optional(),
  summary: z.string(),
  role: z.string().optional(),
  url: z.url().optional(),
  start: partialDate,
  end: partialDate.nullable(),
  highlights,
  stack,
});

export const experienceSchema = z
  .object({
    id: z.string(),
    company: z.string(),
    url: z.url().optional(),
    role: z.string(),
    location: z.string(),
    summary: z.string(),
    start: partialDate,
    end: partialDate.nullable(),
    engagements: z.array(engagementSchema).optional(),
    highlights: highlights.optional(),
    stack: stack.optional(),
  })
  .refine((job) => job.engagements?.length || job.highlights?.length, {
    message: 'An experience entry needs either engagements or highlights',
  });

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  summary: z.string().max(120),
  year: z.number().int().min(2015).max(2100),
  image: z.string().regex(/\.(png|jpe?g|webp|avif)$/),
  stack,
  links: z.object({ live: z.url().optional(), repo: z.url().optional() }),
});

export const skillGroupSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(z.string().min(1)).min(1),
});

export const writingSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  url: z.url(),
  date: z.iso.date(),
  readingMinutes: z.number().int().positive(),
});

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string(),
  school: z.string(),
  location: z.string(),
  url: z.url().optional(),
  start: partialDate,
  end: partialDate,
  note: z.string().optional(),
});

export type Site = z.infer<typeof siteSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Engagement = z.infer<typeof engagementSchema>;
export type Project = z.infer<typeof projectSchema>;
