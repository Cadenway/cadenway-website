import { type ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/**
 * Constant serverConfig
 *
 * @description
 * Providers used during server-side rendering.
 *
 * @type {ApplicationConfig}
 */
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

/**
 * Constant config
 *
 * @description
 * Providers used while the build prerenders pages; no server runs in production.
 *
 * @type {ApplicationConfig}
 */
export const config: ApplicationConfig = mergeApplicationConfig(appConfig, serverConfig);
