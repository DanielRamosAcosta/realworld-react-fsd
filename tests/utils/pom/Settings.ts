import { expect, Page } from '@playwright/test';

export class Settings {
  constructor(private readonly page: Page) {}

  async expectToBeVisible() {
    await expect(
      this.page.getByRole('heading', { name: /Your Settings/i }),
    ).toBeVisible();
  }

  async fill() {
    await this.page.getByPlaceholder('URL of profile picture').fill('example');
    await this.page.getByPlaceholder('Your Name').fill('Bob Mayer');
    await this.page.getByPlaceholder('Short bio about you').fill("It's me");
  }

  async fillAndSave() {
    await this.fill();
    await this.page.getByRole('button', { name: /Update Settings/i }).click();
  }
}
