import { test } from './utils/test';

test('can create an article', async ({ app }) => {
  await app.newArticle.navigate();
  await app.newArticle.writeArticle();

  await app.article.expectToBeVisible();
});

test('delete article', async ({ app }) => {
  await test.step('write article', async () => {
    await app.newArticle.navigate();
    await app.newArticle.writeArticle();
  });
  await test.step('see article', async () => {
    await app.profile.navigate();
    await app.profile.clickArticle();
  });

  await app.article.delete();

  await test.step('disappears from profile', async () => {
    await app.profile.navigate();
    await app.profile.assertDoesNotHaveArticle();
  });
});
