import type { APIRoute } from 'astro';
import { monogramPng } from '@/lib/icons';
export const GET: APIRoute = () => monogramPng(512);
