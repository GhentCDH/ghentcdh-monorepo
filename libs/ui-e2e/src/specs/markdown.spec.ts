import { expect, test } from '@playwright/test';

import { MarkdownHarness } from '@ghentcdh/ui/testing';

import { UiPlaygroundPage } from '../fixtures/UiPlaygroundPage';

test.describe('Markdown', () => {
  test('plain text round-trips', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/markdown');

    await MarkdownHarness.byId(page, 'content').type('hello world');

    await expect.poll(() => fx.value<string>()).toContain('hello world');
  });

  test('bold toolbar wraps typed text with **', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/markdown');

    await MarkdownHarness.byId(page, 'content').typeBold('strong');

    await expect.poll(() => fx.value<string>()).toContain('**strong**');
  });

  test('italic toolbar wraps typed text with *', async ({ page }) => {
    const fx = UiPlaygroundPage.init(page);
    await fx.goto('/markdown');

    await MarkdownHarness.byId(page, 'content').typeItalic('emph');

    await expect.poll(() => fx.value<string>()).toMatch(/\*emph\*/);
  });

  test.fixme('toolbar button is active while typing bold text', async ({
    page,
  }) => {
    await page.goto('/markdown');

    const md = MarkdownHarness.byId(page, 'content');
    await md.toolbar('B').click();
    await md.type('hello');

    /* Caret inside bold run, B not toggled off yet → should be active. */
    expect(await md.isMarkActive('B')).toBe(true);
  });
});
