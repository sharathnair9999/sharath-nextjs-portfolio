import type { APIRoute } from 'astro';
import { site } from '@/lib/site';
import { PALETTE as c } from '@/lib/og';

export const GET: APIRoute = () =>
  Response.json({
    name: site.name,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: '/',
    display: 'browser',
    background_color: c.bg,
    theme_color: c.bg,
    icons: [
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  });
