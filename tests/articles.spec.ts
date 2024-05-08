import { test } from './utils/test';

test('delete article', async ({ app, user }) => {
  await test.step('write article', async () => {
    await app.newArticle.navigate();
    await app.newArticle.writeArticle();
  });

  await test.step('assert content is ok', async () => {
    await app.article.expectToBeVisible();
  });

  await test.step('see article in profile', async () => {
    await app.profile.navigate(user);
    await app.profile.clickArticle();
  });

  await test.step('delete it', async () => {
    await app.article.delete();
  });

  await test.step('assert it disappears from profile', async () => {
    await app.profile.navigate(user);
    await app.profile.assertDoesNotHaveArticle();
  });
});
