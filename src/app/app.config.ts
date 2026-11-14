import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';

/**
 * Constant appConfig
 *
 * @description
 * Root providers shared by the browser and the prerendering build.
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(APP_ROUTES),
    // The browser takes over the prerendered HTML instead of rendering the page again.
    provideClientHydration(),
  ],
};
