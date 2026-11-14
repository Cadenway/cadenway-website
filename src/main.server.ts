import { type BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from '@app/app.component';
import { config } from '@app/app.config.server';

// Entry point the build uses to prerender each route.
const bootstrap = (context: BootstrapContext): ReturnType<typeof bootstrapApplication> =>
  bootstrapApplication(App, config, context);

export default bootstrap;
