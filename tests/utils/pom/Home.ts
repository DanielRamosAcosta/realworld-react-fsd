import { expect, Page } from '@playwright/test';

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
}
