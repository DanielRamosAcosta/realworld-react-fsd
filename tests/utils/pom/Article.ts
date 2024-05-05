import { expect, Page } from '@playwright/test';
import { CHRISTMAS_GIFTS } from '../fixtures/articles';
import { Home } from './Home';

export class Article {
  constructor(
    private readonly page: Page,
    private readonly home: Home,
  ) {}

  async expectToBeVisible({
    title = CHRISTMAS_GIFTS.title,
    body = CHRISTMAS_GIFTS.body,
  } = {}) {
    await expect(this.page.getByText(title)).toBeVisible();
    await expect(this.page.getByText(body)).toBeVisible();
  }

  async delete() {
    await this.page
      .getByRole('button', { name: /Delete Article/i })
      .first()
      .click();
    await this.home.expectToBeVisible();
  }
}
