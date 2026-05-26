import { expect, test } from '@playwright/test';

import { AlertHarness } from '@ghentcdh/ui/testing';

test.describe('Alert', () => {
  test('success alert is visible with correct message', async ({ page }) => {
    await page.goto('/alert');

    const alert = AlertHarness.byMessage(page, 'Operation successful');
    await expect(alert.asLocator()).toBeVisible();
    expect(await alert.message()).toContain('Operation successful');
  });

  test('error alert has alert-error class', async ({ page }) => {
    await page.goto('/alert');

    const alert = AlertHarness.byMessage(page, 'Something went wrong');
    expect(await alert.hasClass('alert-error')).toBe(true);
  });

  test('warning alert has alert-warning class', async ({ page }) => {
    await page.goto('/alert');

    const alert = AlertHarness.byMessage(page, 'Check your input');
    expect(await alert.hasClass('alert-warning')).toBe(true);
  });

  test('info alert has alert-info class', async ({ page }) => {
    await page.goto('/alert');

    const alert = AlertHarness.byMessage(page, 'For your information');
    expect(await alert.hasClass('alert-info')).toBe(true);
  });

  test('success alert has alert-success class', async ({ page }) => {
    await page.goto('/alert');

    const alert = AlertHarness.byMessage(page, 'Operation successful');
    expect(await alert.hasClass('alert-success')).toBe(true);
  });
});
