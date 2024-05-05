import { Page } from '@playwright/test';
import { SignUp } from './SignUp';
import { Home } from './Home';
import { NewArticle } from './NewArticle';
import { Article } from './Article';
import { Profile } from './Profile';

export function createApp(page: Page) {
  const home = new Home(page);
  const article = new Article(page, home);
  return {
    signUp: new SignUp(page),
    home: home,
    newArticle: new NewArticle(page, article),
    article: article,
    profile: new Profile(page),
  };
}
