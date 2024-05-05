import { test as setup } from './utils/test';
import { ALICE, BOB } from './utils/fixtures/users';
import { clean } from './utils/clean';

setup.beforeAll(clean);

setup('setup alice', async ({ browser }) => {
  const alice = await ALICE.instance(browser);
  await alice.utils.loginOrSignUp(ALICE);
  await alice.page.context().storageState({ path: ALICE.path });
});

setup('setup bob', async ({ browser }) => {
  const bob = await BOB.instance(browser);
  await bob.utils.loginOrSignUp(BOB);
  await bob.page.context().storageState({ path: BOB.path });
});
