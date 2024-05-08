import { expect, Page } from '@playwright/test';
import { CHRISTMAS_GIFTS } from '../fixtures/articles';
import { comment } from '../fixtures/comment';

export class Article {
  constructor(private readonly page: Page) {}

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

    await this.page.waitForURL('/');
  }

  async writeComment({ body = comment.body } = {}) {
    await this.getCommentInput().fill(body);
    await this.postComment();
  }

  private async postComment() {
    await this.page.getByRole('button', { name: /Post Comment/i }).click();
  }

  private getCommentInput() {
    return this.page.getByPlaceholder(/Write a comment/);
  }
}
