import type { Routes } from '@angular/router';

/**
 * Constant APP_ROUTES
 *
 * @description
 * Route table of the site; each page is prerendered.
 *
 * @type {Routes}
 */
export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@features/home/home.routes').then((entry) => entry.HOME_ROUTES),
  },
  {
    path: 'aide',
    loadChildren: () => import('@features/legal/legal.routes').then((entry) => entry.LEGAL_ROUTES),
  },
];
