import { RenderMode, type ServerRoute } from '@angular/ssr';

/**
 * Rendering mode of each route: every route is prerendered at build time, because the site ships as
 * static files and must be readable by search engines without running scripts.
 */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
