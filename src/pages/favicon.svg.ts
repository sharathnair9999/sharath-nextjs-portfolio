import type { APIRoute } from 'astro';
import { initials } from '@/lib/icons';
import { PALETTE as c } from '@/lib/og';

export const GET: APIRoute = () =>
  new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${c.bg}"/><text x="32" y="42" text-anchor="middle" font-family="system-ui,-apple-system,Segoe UI,sans-serif" font-size="26" font-weight="700" letter-spacing="-1" fill="${c.fg}">${initials}</text><circle cx="50" cy="50" r="4" fill="${c.accent}"/></svg>`,
    { headers: { 'Content-Type': 'image/svg+xml' } },
  );
