import { type Page, expect, test } from '@playwright/test';

import { AutocompleteHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

const authors = [
  { id: 1, name: 'Tolstoy' },
  { id: 2, name: 'Tolkien' },
  { id: 3, name: 'Borges' },
];

async function mockAuthors(page: Page) {
  await page.route('**/api/authors**', (route) => {
    const url = new URL(route.request().url());
    const q = (url.searchParams.get('q') ?? '').toLowerCase();
    const filtered = q
      ? authors.filter((a) => a.name.toLowerCase().includes(q))
      : authors;
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filtered),
    });
  });
}

test.describe('Autocomplete', () => {
  test('typing filters and selecting commits the value', async ({ page }) => {
    await mockAuthors(page);
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/autocomplete');

    await AutocompleteHarness.byId(page, 'author').fill('Tolstoy');
    const value = await fx.value<{ name: string }>();
    expect(value?.name).toBe('Tolstoy');
  });

  test('query() leaves the dropdown open for inspection', async ({ page }) => {
    await mockAuthors(page);
    await page.goto('/autocomplete');

    await AutocompleteHarness.byId(page, 'author').query('Tol');

    await expect(page.getByRole('option', { name: 'Tolstoy' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Tolkien' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Borges' })).toHaveCount(0);
  });

  test('shows "No results found" when the filter matches nothing', async ({
    page,
  }) => {
    await mockAuthors(page);
    await page.goto('/autocomplete');

    await AutocompleteHarness.byId(page, 'author').query('zzzzz');
    await expect(page.getByText('No results found')).toBeVisible();
  });

  test.fixme('keyboard navigation: ArrowDown + Enter selects the first option', async ({
    page,
  }) => {
    await mockAuthors(page);
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/autocomplete');

    const author = AutocompleteHarness.byId(page, 'author');
    await author.query('Tol');
    await author.press('ArrowDown');
    await author.press('Enter');

    const value = await fx.value<{ name: string }>();
    expect(value?.name).toBe('Tolstoy');
  });

  test('Escape closes the dropdown', async ({ page }) => {
    await mockAuthors(page);
    await page.goto('/autocomplete');

    const author = AutocompleteHarness.byId(page, 'author');
    await author.query('Tol');
    await expect(author.listbox()).toBeVisible();

    await author.press('Escape');
    await expect(author.listbox()).toBeHidden();
  });

  test('clickCreateNew emits @create', async ({ page }) => {
    await mockAuthors(page);
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/autocomplete');

    await AutocompleteHarness.byId(page, 'author').clickCreateNew();
    expect(await fx.probe<number>('last-create')).toBe(1);
  });

  test('clear empties the input', async ({ page }) => {
    await mockAuthors(page);
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/autocomplete');

    const author = AutocompleteHarness.byId(page, 'author');
    await author.fill('Tolstoy');
    await author.clear();

    expect(await author.value()).toBe('');
  });
});
