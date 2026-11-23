import type { Routes } from '@angular/router';

/**
 * Constant LEGAL_ROUTES
 *
 * @description
 * Serves the public help page independently of the landing page.
 *
 * @type {Routes}
 */
export const LEGAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/pages/help-page/help-page.component').then((page) => page.HelpPage),
  },
];
