import { test } from './utils/test';

test('delete article', async ({ app, user }) => {
  await test.step('write article', async () => {
    await app.newArticle.navigate();
    await app.newArticle.writeArticle();
  });

  await test.step('see article in profile', async () => {
    await app.profile.navigate(user);
    await app.profile.clickArticle();
  });

  await test.step('delete it', async () => {
    await app.article.delete();
  });

  await test.step('disappears from profile', async () => {
    await app.profile.navigate(user);
    await app.profile.assertDoesNotHaveArticle();
  });
});
