import { expect, test } from '@playwright/test';

import { SelectHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('Select', () => {
  test('select commits a value', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/select');

    await SelectHarness.byId(page, 'color').select('Green');
    expect(await fx.value()).toMatchObject({ value: 'green' });
  });

  test('open() leaves the listbox visible', async ({ page }) => {
    await page.goto('/select');
    await SelectHarness.byId(page, 'color').open();
    await expect(page.getByRole('option', { name: 'Red' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Green' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Blue' })).toBeVisible();
  });

  test('clear empties the selection', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/select');

    await SelectHarness.byId(page, 'color').select('Red');
    await SelectHarness.byId(page, 'color').clear();
    expect(await fx.value()).toBeNull();
  });
});
