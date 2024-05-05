import { Page } from '@playwright/test';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { ALICE } from '../fixtures/users';

export class Utils {
  constructor(
    private readonly page: Page,
    private readonly signIn: SignIn,
    private readonly signUp: SignUp,
  ) {}

  async loginOrSignUp({
    name = ALICE.name,
    email = ALICE.email,
    password = ALICE.password,
  } = {}) {
    try {
      await this.page.goto('/');
      await this.page.getByText('Your Feed').waitFor({ timeout: 300 });
    } catch {
      await this.signIn.navigate();
      await this.signIn.fill({ email, password });
      await this.signIn.signIn();
      try {
        await this.page.waitForURL(/profile/i, { timeout: 300 });
      } catch (error) {
        await this.signUp.navigate();
        await this.signUp.fillAndSignUp({
          name,
          email,
          password,
        });
      }
    }
  }
}
