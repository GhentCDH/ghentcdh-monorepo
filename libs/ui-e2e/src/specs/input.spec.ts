import { expect, test } from '@playwright/test';

import { TextHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('Input', () => {
  test('fill updates the model', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/input');

    await TextHarness.byId(page, 'name').fill('Bo');
    expect(await fx.value()).toBe('Bo');
  });

  test('type writes character by character', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/input');

    await TextHarness.byId(page, 'name').type('hello');
    expect(await fx.value()).toBe('hello');
  });

  test('clear empties the input', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/input');

    await TextHarness.byId(page, 'name').fill('Bo');
    await TextHarness.byId(page, 'name').clear();
    expect(await fx.value()).toBe('');
  });

  test('required adds an asterisk to the label', async ({ page }) => {
    await page.goto('/input');
    /* `required: true` on the page; ControlWrapper renders `<span>*</span>` next to the label. */
    await expect(page.locator('legend').getByText('*')).toBeVisible();
  });
});
