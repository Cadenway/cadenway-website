import type { Routes } from '@angular/router';

/**
 * Constant HOME_ROUTES
 *
 * @description
 * Loads the public home page independently of the legal feature.
 *
 * @type {Routes}
 */
export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/pages/home-page/home-page.component').then((page) => page.HomePage),
  },
];
