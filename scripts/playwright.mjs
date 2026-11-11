#!/usr/bin/env node
/**
 * Runs the Playwright tests for the `e2e` package script.
 *
 * pnpm forwards the `--` of `pnpm e2e -- <spec>` as a literal argument and Playwright ignores what
 * follows it: the filter would be dropped and every scenario would run. This launcher removes the
 * separator so the rest reaches Playwright as file filters and options.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const playwright = fileURLToPath(
  new URL('../node_modules/@playwright/test/cli.js', import.meta.url),
);
const args = process.argv.slice(2).filter((arg) => arg !== '--');
const result = spawnSync(process.execPath, [playwright, 'test', ...args], { stdio: 'inherit' });

process.exit(result.status ?? 1);
