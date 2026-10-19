import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const fontFile = (weight: number) =>
  readFile(require.resolve(`@fontsource/geist-sans/files/geist-sans-latin-${weight}-normal.woff`));

// Satori takes a React-like element tree; plain objects avoid pulling React into the build.
type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
export const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

export async function renderPng(tree: Node, width: number, height: number) {
  const [regular, semibold] = await Promise.all([fontFile(400), fontFile(600)]);
  const svg = await satori(tree as never, {
    width,
    height,
    fonts: [
      { name: 'Geist', data: regular, weight: 400, style: 'normal' },
      { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
    ],
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

export const pngResponse = (png: Uint8Array) =>
  new Response(png as BodyInit, { headers: { 'Content-Type': 'image/png' } });

export const PALETTE = {
  bg: '#14151a',
  fg: '#f3f1ec',
  muted: '#a3a6b0',
  accent: '#f2b347',
  border: '#2a2c33',
};
