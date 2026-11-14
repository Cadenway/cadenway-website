import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { verifyAngularArchitecture } from '@cadenway/angular-testing/architecture';

test('authored code follows the Cadenway architecture', () => {
  const findings = verifyAngularArchitecture({
    rootDir: fileURLToPath(new URL('../..', import.meta.url)),
    tsconfig: 'tsconfig.app.json',
    profile: 'application',
  });
  assert.equal(
    findings.length,
    0,
    findings
      .map(({ file, line, rule, message }) => `${file}:${line} [${rule}] ${message}`)
      .join('\n'),
  );
});
