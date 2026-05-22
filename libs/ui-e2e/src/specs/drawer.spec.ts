import { expect, test } from '@playwright/test';

import { DrawerHarness } from '@ghentcdh/ui/testing';

test.describe('Drawer', () => {
  test('left panel starts open', async ({ page }) => {
    await page.goto('/drawer');

    const drawer = DrawerHarness.root(page);
    expect(await drawer.isLeftOpen()).toBe(true);
  });

  test('right panel starts closed', async ({ page }) => {
    await page.goto('/drawer');

    const drawer = DrawerHarness.root(page);
    expect(await drawer.isRightOpen()).toBe(false);
  });

  test('toggle left collapses the left panel', async ({ page }) => {
    await page.goto('/drawer');

    const drawer = DrawerHarness.root(page);
    await drawer.toggleLeft();
    expect(await drawer.isLeftOpen()).toBe(false);
  });

  test('toggle right expands the right panel', async ({ page }) => {
    await page.goto('/drawer');

    const drawer = DrawerHarness.root(page);
    await drawer.toggleRight();
    expect(await drawer.isRightOpen()).toBe(true);
  });

  test('main content is always visible', async ({ page }) => {
    await page.goto('/drawer');

    await expect(page.getByTestId('main-content')).toBeVisible();
  });
});
