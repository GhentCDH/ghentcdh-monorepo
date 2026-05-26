import { expect, test } from '@playwright/test';

import { ModalHarness, TextHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('Modal', () => {
  test('opens and shows the title', async ({ page }) => {
    await page.goto('/modal');
    await page.getByRole('button', { name: 'Open modal' }).click();

    const modal = ModalHarness.byTitle(page, 'Demo modal');
    await expect(modal.asLocator()).toBeVisible();
    await expect(modal.title()).toHaveText('Demo modal');
  });

  test('clickClose() closes the modal and emits closeModal', async ({
    page,
  }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/modal');
    await page.getByRole('button', { name: 'Open modal' }).click();

    const modal = ModalHarness.byTitle(page, 'Demo modal');
    await modal.clickClose();

    await expect(modal.asLocator()).toBeHidden();
    expect(await fx.probe<number>('closed-count')).toBeGreaterThanOrEqual(1);
  });

  test('Escape closes the modal (native <dialog> behavior)', async ({
    page,
  }) => {
    await page.goto('/modal');
    await page.getByRole('button', { name: 'Open modal' }).click();

    const modal = ModalHarness.byTitle(page, 'Demo modal');
    await modal.pressEscape();
    await expect(modal.asLocator()).toBeHidden();
  });

  test('action buttons in the #actions slot are clickable', async ({
    page,
  }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/modal');
    await page.getByRole('button', { name: 'Open modal' }).click();

    const modal = ModalHarness.byTitle(page, 'Demo modal');
    await modal.clickAction('Confirm');

    expect(await fx.probe<boolean>('confirmed')).toBe(true);
    await expect(modal.asLocator()).toBeHidden();
  });

  test('input inside the modal is reachable through the modal scope', async ({
    page,
  }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/modal');
    await page.getByRole('button', { name: 'Open modal' }).click();

    const modal = ModalHarness.byTitle(page, 'Demo modal');
    await TextHarness.byId(modal.asLocator(), 'modal-name').fill('Bo');

    expect(await fx.value()).toBe('Bo');
  });
});
