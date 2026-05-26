import { expect, test } from '@playwright/test';

import { MultiSelectHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('MultiSelect', () => {
  test('picks multiple options without closing the listbox between picks', async ({
    page,
  }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/multi-select');

    await MultiSelectHarness.byId(page, 'tags').fill(['Alpha', 'Beta']);

    const value = await fx.value<{ value: string }[]>();
    expect(value.map((v) => v.value)).toEqual(['a', 'b']);
  });

  test('deselecting an option removes it from the value', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/multi-select');

    const h = MultiSelectHarness.byId(page, 'tags');
    await h.fill(['Alpha', 'Beta', 'Gamma']);
    await h.select('Beta');

    const value = await fx.value<{ value: string }[]>();
    expect(value.map((v) => v.value)).toEqual(['a', 'c']);
  });
});
