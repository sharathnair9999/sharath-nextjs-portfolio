import raw from '../data/site.json';
import { siteSchema } from './schemas';
import { yearsSince } from './dates';

// site.json is a single object, so it is validated here rather than as a collection.
export const site = siteSchema.parse(raw);

/** Replaces {years} in copy with whole years since careerStart, so the bio never goes stale. */
export const fill = (text: string) => text.replaceAll('{years}', String(yearsSince(site.careerStart)));

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();

/** Canonical URL for a page path: drops the "/index.html" or ".html" that file-format builds report. */
export const canonicalUrl = (pathname: string) =>
  absoluteUrl(pathname.replace(/\/?(index)?\.html$/, '') || '/');
