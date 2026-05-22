import { expect, test } from '@playwright/test';

import { ButtonHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('Button', () => {
  test('click emits the click event', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/button');

    await ButtonHarness.byName(page, 'Primary').click();
    expect(await fx.probe<number>('click-count')).toBe(1);
  });

  test('clicking multiple times increments count', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/button');

    const btn = ButtonHarness.byName(page, 'Primary');
    await btn.click();
    await btn.click();
    await btn.click();
    expect(await fx.probe<number>('click-count')).toBe(3);
  });

  test('disabled button cannot be clicked', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/button');

    const btn = ButtonHarness.byName(page, 'Disabled');
    await expect(btn.locator).toBeDisabled();
  });

  test('outline button is rendered and clickable', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/button');

    await ButtonHarness.byName(page, 'Outline').click();
    expect(await fx.probe<number>('click-count')).toBe(1);
  });
});
