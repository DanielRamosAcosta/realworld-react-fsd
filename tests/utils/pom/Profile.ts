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

  async expectToBeVisible() {
    await this.page.waitForURL(/profile/i);
  }

  async clickArticle({ name = CHRISTMAS_GIFTS.title } = {}) {
    await this.page.getByRole('link', { name: new RegExp(name) }).click();
  }

  async assertDoesNotHaveArticle({ name = CHRISTMAS_GIFTS.title } = {}) {
    await expect(
      this.page.getByRole('link', { name: new RegExp(name, 'i') }),
    ).not.toBeVisible();
  }
}
