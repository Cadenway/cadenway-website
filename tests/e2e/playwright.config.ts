import { resolve } from 'node:path';

import { defineConfig, devices } from '@playwright/test';

const workspace = resolve(__dirname, '../..');
const localUrl = 'http://localhost:4300';
// Point the tests at an application that is already served elsewhere (another port, the ops stack).
const externalUrl = process.env['E2E_BASE_URL'];

export default defineConfig({
  testDir: '.',
  outputDir: '../../test-results',
  forbidOnly: process.env['CI'] !== undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: '../../playwright-report' }]],
  use: {
    baseURL: externalUrl ?? localUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // A running `pnpm start` is reused and left running: never stop a server you did not start.
  webServer:
    externalUrl === undefined
      ? {
          command: 'pnpm start',
          cwd: workspace,
          url: localUrl,
          reuseExistingServer: true,
          timeout: 120_000,
        }
      : undefined,
});
