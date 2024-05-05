import { Page, expect } from '@playwright/test';
import { CHRISTMAS_GIFTS } from '../fixtures/articles';
import { Article } from './Article';

export class NewArticle {
  constructor(
    private readonly page: Page,
    private readonly article: Article,
  ) {}

  async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: /New Article/i }).click();
    await expect(this.getTitleInput()).toBeVisible();
  }

  async writeArticle({
    title = CHRISTMAS_GIFTS.title,
    description = CHRISTMAS_GIFTS.description,
    body = CHRISTMAS_GIFTS.body,
    tags = CHRISTMAS_GIFTS.tags,
  } = {}) {
    await this.getTitleInput().fill(title);
    await this.page.getByPlaceholder(/What's this article/i).fill(description);
    await this.page.getByPlaceholder(/Write your article/i).fill(body);
    await this.page.getByPlaceholder(/Write your article/i).fill(body);
    await this.page.getByPlaceholder(/Enter tags/i).fill(tags);
    await this.page.getByRole('button', { name: /Publish Article/i }).click();
    await this.article.expectToBeVisible({ title, body });
  }

  private getTitleInput() {
    return this.page.getByPlaceholder(/Article Title/i);
  }
}
