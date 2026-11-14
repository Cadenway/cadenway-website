import { RenderMode, type ServerRoute } from '@angular/ssr';

/**
 * Constant serverRoutes
 *
 * @description
 * Rendering mode of each route: every route is prerendered at build time, because the site ships as
 * static files and must be readable by search engines without running scripts.
 *
 * @type {ServerRoute[]}
 */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
