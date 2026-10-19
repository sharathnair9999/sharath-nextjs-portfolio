import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from '@/lib/site';
import { h, renderPng, pngResponse, PALETTE as c } from '@/lib/og';

// Social preview card, generated at build time from site.json.
export const GET: APIRoute = async () => {
  const avatar = await readFile(path.resolve('src/assets', site.avatar.src)); // build runs from the project root
  const avatarUri = `data:image/jpeg;base64,${avatar.toString('base64')}`;
  const host = new URL(site.url).host;

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      boxSizing: 'border-box',
      background: c.bg,
      color: c.fg,
      fontFamily: 'Geist',
    },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
        {
          type: 'img',
          props: {
            src: avatarUri,
            width: 112,
            height: 112,
            style: { borderRadius: 999, border: `2px solid ${c.border}` },
          },
        },
        h('div', { display: 'flex', flexDirection: 'column' }, [
          h('div', { fontSize: 34, fontWeight: 600 }, site.name),
          h('div', { fontSize: 24, color: c.muted, marginTop: 4 }, site.role),
        ]),
      ]),
      h(
        'div',
        { display: 'flex', fontSize: 64, fontWeight: 600, lineHeight: 1.1, letterSpacing: -2, maxWidth: 960 },
        site.hero.headline,
      ),
      h(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 24,
          color: c.muted,
        },
        [h('div', { display: 'flex' }, site.location), h('div', { display: 'flex', color: c.accent }, host)],
      ),
    ],
  );

  return pngResponse(await renderPng(tree, 1200, 630));
};
