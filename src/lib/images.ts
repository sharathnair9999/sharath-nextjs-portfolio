import type { ImageMetadata } from 'astro';

// Images are referenced by filename from JSON and resolved here, so a typo fails the build.
const assets = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
});

export function asset(path: string): ImageMetadata {
  const found = assets[`/src/assets/${path}`];
  if (!found) throw new Error(`Image not found: src/assets/${path}`);
  return found.default;
}

export const projectImage = (file: string) => asset(`projects/${file}`);
