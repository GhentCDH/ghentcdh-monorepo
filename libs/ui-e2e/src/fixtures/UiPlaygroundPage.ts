import type { Page } from '@playwright/test';

/**
 * Page object for the ui-e2e playground.
 *
 * Specs navigate to one of the component routes, then drive the rendered
 * widget via a harness from `@ghentcdh/ui/testing`. This fixture is intentionally
 * thin — it just wraps `goto` and the `ValueProbe` reader.
 */
export class UiPlaygroundPage {
  static init(page: Page): UiPlaygroundPage {
    return new UiPlaygroundPage(page);
  }

  private constructor(private readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /** Read the page's `<pre data-testid="value">` and parse it as JSON. */
  async value<T = unknown>(): Promise<T> {
    const raw = await this.page.locator('[data-testid="value"]').textContent();
    return JSON.parse(raw ?? 'null') as T;
  }

  /** Read an arbitrary probe by testid. */
  async probe<T = unknown>(testid: string): Promise<T> {
    const raw = await this.page
      .locator(`[data-testid="${testid}"]`)
      .textContent();
    return JSON.parse(raw ?? 'null') as T;
  }
}
