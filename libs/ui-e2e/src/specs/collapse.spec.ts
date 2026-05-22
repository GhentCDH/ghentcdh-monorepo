import { expect, test } from '@playwright/test';

import { CollapseHarness } from '@ghentcdh/ui/testing';

test.describe('Collapse', () => {
  test('starts closed and opens on toggle', async ({ page }) => {
    await page.goto('/collapse');

    const collapse = CollapseHarness.byTitle(page, 'Details');
    expect(await collapse.isOpen()).toBe(false);

    await collapse.toggle();
    expect(await collapse.isOpen()).toBe(true);
  });

  test('shows content when open', async ({ page }) => {
    await page.goto('/collapse');

    const collapse = CollapseHarness.byTitle(page, 'Details');
    await collapse.toggle();

    await expect(page.getByTestId('collapse-content')).toBeVisible();
  });

  test('toggle twice closes it again', async ({ page }) => {
    await page.goto('/collapse');

    const collapse = CollapseHarness.byTitle(page, 'Details');
    await collapse.toggle();
    await collapse.toggle();

    expect(await collapse.isOpen()).toBe(false);
  });

  test('displays the title', async ({ page }) => {
    await page.goto('/collapse');

    const collapse = CollapseHarness.byTitle(page, 'Details');
    await expect(collapse.title()).toHaveText('Details');
  });

  test('disabled collapse is always open', async ({ page }) => {
    await page.goto('/collapse');

    await expect(page.getByTestId('disabled-content')).toBeVisible();
  });
});
