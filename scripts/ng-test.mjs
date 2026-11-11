#!/usr/bin/env node
/**
 * Runs the unit tests for the package scripts (`test`, `test:coverage`).
 *
 * pnpm forwards the `--` of `pnpm test -- <area>` as a literal argument and `ng test` ignores what
 * follows it: the filter would be dropped and every spec would run. This launcher removes the
 * separator, passes options through and turns each positional argument into an `--include` of the
 * unit-test builder, which expects a path or a glob relative to `src/`.
 *
 * An area can be given the way people name it: `task`, `core/config`, `app/task`,
 * `src/app/task/task-row.spec.ts`. Anything that is not an existing path is passed as a glob.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { posix, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const sourceRoot = resolve(root, 'src');
const ng = resolve(root, 'node_modules/@angular/cli/bin/ng.js');

function toInclude(area) {
  const candidates = [
    resolve(root, area),
    resolve(sourceRoot, area),
    resolve(sourceRoot, 'app', area),
  ];
  const found = candidates.find(
    (candidate) => candidate.startsWith(sourceRoot) && existsSync(candidate),
  );
  return found === undefined ? area : relative(sourceRoot, found).split(sep).join(posix.sep);
}

const args = process.argv.slice(2).filter((arg) => arg !== '--');
const options = args.filter((arg) => arg.startsWith('-'));
const includes = args
  .filter((arg) => !arg.startsWith('-'))
  .flatMap((area) => ['--include', toInclude(area)]);

const result = spawnSync(process.execPath, [ng, 'test', '--no-watch', ...options, ...includes], {
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
