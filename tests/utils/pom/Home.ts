import { expect, Page } from '@playwright/test';
import { CHRISTMAS_GIFTS } from '../fixtures/articles';
import { ALICE } from '../fixtures/users';

export class Home {
  constructor(private readonly page: Page) {}

  async navigate() {
    await this.page.goto('/');
    await this.expectToBeVisible();
  }

  async expectToBeVisible() {
    await expect(this.getTitle()).toBeVisible();
    await expect(this.getSubtitle()).toBeVisible();
  }

  private getTitle() {
    return this.page.getByRole('heading', { name: /Conduit/i });
  }

  private getSubtitle() {
    return this.page.getByText(/A place to share your knowledge/i);
  }

  async seeGlobalFeed() {
    return this.page.getByRole('button', { name: /Global Feed/i }).click();
  }

  async clickArticle({ title = CHRISTMAS_GIFTS.title } = {}) {
    await this.page.getByRole('link', { name: new RegExp(title) }).click();
  }

  async clickMyProfile({ name = ALICE.name } = {}) {
    await this.page.getByRole('link', { name: new RegExp(name, 'i') }).click();
  }
}
