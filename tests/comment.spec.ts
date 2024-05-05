import { test } from './utils/test';
import { ALICE, BOB } from './utils/fixtures/users';
import { comment } from './utils/fixtures/comment';
import { CATS_RULES } from './utils/fixtures/articles';

test('comment', async ({ browser }) => {
  const alice = await ALICE.instance(browser);
  const bob = await BOB.instance(browser);

  await test.step('create the article', async () => {
    await alice.newArticle.navigate();
    await alice.newArticle.writeArticle({ title: CATS_RULES.title });
  });

  await test.step('leave a comment', async () => {
    await bob.home.navigate();
    await bob.home.seeGlobalFeed();
    await bob.home.clickArticle({ title: CATS_RULES.title });
    await bob.article.writeComment();
  });

  await alice.reload();
  await alice.expectToSee(comment.body + 'error');
});
