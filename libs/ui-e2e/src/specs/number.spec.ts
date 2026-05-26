import { expect, test } from '@playwright/test';

import { NumberHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('InputNumber', () => {
  test('fill coerces to a number on blur', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/number');

    await NumberHarness.byId(page, 'age').fill(34);
    expect(await fx.value()).toBe(34);
  });

  test('clearing produces null/empty', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/number');

    await NumberHarness.byId(page, 'age').fill(7);
    await NumberHarness.byId(page, 'age').clear();
    expect(await fx.value()).toBeFalsy();
  });

  test('value() round-trips through the harness', async ({ page }) => {
    await page.goto('/number');
    const age = NumberHarness.byId(page, 'age');
    await age.fill(42);
    expect(await age.value()).toBe(42);
  });
});
