import { type BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from '@app/app.component';
import { config } from '@app/app.config.server';

/**
 * Function bootstrap
 *
 * @description
 * Bootstraps the application when the build prerenders a route.
 *
 * @param {BootstrapContext} context - Context supplied by the server renderer.
 * @returns {ReturnType<typeof bootstrapApplication>} The bootstrapped application.
 */
const bootstrap: (context: BootstrapContext) => ReturnType<typeof bootstrapApplication> = (
  context: BootstrapContext,
): ReturnType<typeof bootstrapApplication> => bootstrapApplication(App, config, context);

export default bootstrap;
