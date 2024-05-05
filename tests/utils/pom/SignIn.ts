import { Page } from '@playwright/test';
import { ALICE } from '../fixtures/users';

export class SignIn {
  constructor(private readonly page: Page) {}

  async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: /Sign in/i }).click();
  }

  async fill({ email = ALICE.email, password = ALICE.password } = {}) {
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
  }

  async fillAndSignIn({ email = ALICE.email, password = ALICE.password } = {}) {
    await this.fill({ email, password });
    await this.signIn();
    await this.page.waitForURL(/profile/i);
  }

  async signIn() {
    await this.page.getByRole('button', { name: /Sign in/i }).click();
  }
}
