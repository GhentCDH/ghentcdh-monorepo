import { expect, test } from '@playwright/test';

import { TextAreaHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('Textarea', () => {
  test('multi-line content round-trips', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/textarea');

    await TextAreaHarness.byId(page, 'comment').fill(
      'line one\nline two\nline three',
    );
    expect(await fx.value()).toBe('line one\nline two\nline three');
  });

  test('clear empties the textarea', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/textarea');

    await TextAreaHarness.byId(page, 'comment').fill('content');
    await TextAreaHarness.byId(page, 'comment').clear();
    expect(await fx.value()).toBe('');
  });
});
