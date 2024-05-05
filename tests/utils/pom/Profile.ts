import { expect, Page } from '@playwright/test';
import { ALICE } from '../fixtures/users';
import { CHRISTMAS_GIFTS } from '../fixtures/articles';

export class Profile {
  constructor(private readonly page: Page) {}

  async navigate({ name = ALICE.name } = {}) {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: new RegExp(name, 'i') }).click();
    await this.expectToBeVisible();
  }

  async expectToBeVisible({ name = ALICE.name } = {}) {
    await expect(
      this.page.getByRole('button', {
        name: new RegExp(`${name}'s Articles`, 'i'),
      }),
    ).toBeVisible();
  }

  async clickArticle({ name = CHRISTMAS_GIFTS.title } = {}) {
    await this.page.getByRole('link', { name: new RegExp(name) }).click();
  }

  async hasNoArticles() {
    await expect(
      this.page.getByText(/No articles are here... yet./i),
    ).toBeVisible();
  }

  async assertDoesNotHaveArticle({ name = CHRISTMAS_GIFTS.title } = {}) {
    await expect(
      this.page.getByRole('link', { name: new RegExp(name, 'i') }),
    ).not.toBeVisible();
  }
}
