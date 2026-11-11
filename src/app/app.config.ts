import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/** Root providers of the site, shared by the browser and by the prerendering build. */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // The browser takes over the prerendered HTML instead of rendering the page again.
    provideClientHydration(),
  ],
};
