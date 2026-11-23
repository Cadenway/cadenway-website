import { expect, test } from '@playwright/test';

test('the landing page links to the public help page and updates the metadata', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Cadenway — gestion de projet pour les équipes');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Vos projets avancent. Votre équipe aussi.',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://cadenway.com/',
  );

  await page.getByRole('link', { name: 'Aide' }).click();

  await expect(page).toHaveURL(/\/aide$/);
  await expect(page).toHaveTitle('Aide — Cadenway');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aide');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://cadenway.com/aide',
  );
});
