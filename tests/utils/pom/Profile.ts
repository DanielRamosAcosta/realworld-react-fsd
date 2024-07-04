import { expect, Page } from '@playwright/test';
import { ALICE } from '../fixtures/users';
import { CHRISTMAS_GIFTS } from '../fixtures/articles';
import { Home } from './Home';

export class Profile {
  constructor(
    private readonly page: Page,
    private readonly home: Home,
  ) {}

  async navigate({ name = ALICE.name } = {}) {
    await this.home.navigate();
    await this.home.clickMyProfile({ name });
    await this.expectToBeVisible();
  }

  async expectToBeVisible() {
    await this.page.waitForURL(/profile/i);
  }

  async clickArticle({ title = CHRISTMAS_GIFTS.title } = {}) {
    await this.findArticleByTitle(title).click();
  }

  async assertDoesNotHaveArticle({ name = CHRISTMAS_GIFTS.title } = {}) {
    await expect(this.findArticleByTitle(name)).not.toBeVisible();
  }

  private findArticleByTitle(name: string) {
    return this.page.getByRole('link', { name: new RegExp(name, 'i') });
  }
}
