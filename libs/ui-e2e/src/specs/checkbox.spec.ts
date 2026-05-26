import { expect, test } from '@playwright/test';

import { BooleanHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('Checkbox', () => {
  test('check sets the value to true', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/checkbox');

    await BooleanHarness.byId(page, 'accept').fill(true);
    expect(await fx.value()).toBe(true);
  });

  test('uncheck sets the value to false', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/checkbox');

    await BooleanHarness.byId(page, 'accept').fill(true);
    await BooleanHarness.byId(page, 'accept').fill(false);
    expect(await fx.value()).toBe(false);
  });

  test('toggle flips the value', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/checkbox');

    const h = BooleanHarness.byId(page, 'accept');
    await h.toggle();
    expect(await fx.value()).toBe(true);
    await h.toggle();
    expect(await fx.value()).toBe(false);
  });
});
