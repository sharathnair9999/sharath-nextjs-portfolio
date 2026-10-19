import { site } from './site';
import { h, renderPng, pngResponse, PALETTE as c } from './og';

export const initials = site.name
  .split(' ')
  .map((part) => part[0])
  .join('');

/** Square monogram icon in the site's dark palette. */
export async function monogramPng(size: number) {
  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: c.bg,
      color: c.fg,
      fontFamily: 'Geist',
      fontWeight: 600,
      fontSize: size * 0.42,
      letterSpacing: -size * 0.02,
      borderRadius: size <= 32 ? size * 0.22 : 0,
    },
    initials,
  );
  return pngResponse(await renderPng(tree, size, size));
}
