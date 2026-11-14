import { expect, test } from '@playwright/test';

// Pipeline check of the bootstrap, not a mockup flow: the first real scenario replaces it.
test('the site starts', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Cadenway');
  await expect(page.locator('cw-root')).toBeAttached();
});
