import { Page, expect } from '@playwright/test';
import { SignUp } from './SignUp';
import { Home } from './Home';
import { NewArticle } from './NewArticle';
import { Article } from './Article';
import { Profile } from './Profile';
import { Settings } from './Settings';
import { SignIn } from './SignIn';
import { Utils } from './Utils';

export function createApp(page: Page) {
  const home = new Home(page);
  const article = new Article(page);
  const settings = new Settings(page);
  const profile = new Profile(page, home);
  const newArticle = new NewArticle(page);
  const signUp = new SignUp(page);
  const signIn = new SignIn(page);
  const utils = new Utils(page, signIn, signUp);

  return {
    article,
    home,
    newArticle,
    profile,
    settings,
    signUp,
    signIn,
    utils,
    reload: () => page.reload(),
    async expectToSee(text: string) {
      await expect(page.getByText(text)).toBeVisible();
    },
  };
}
