import { test as setup } from './utils/test';
import { ALICE, BOB } from './utils/fixtures/users';
import { createApp } from './utils/pom/createApp';
import { clean } from './utils/clean';

setup.beforeAll(clean);

setup('setup alice', async ({ browser }) => {
  const page = await browser.newPage({
    storageState: undefined,
    baseURL: 'http://localhost:5173',
  });
  const app = createApp(page);
  await app.utils.loginOrSignUp(ALICE);
  await page.context().storageState({ path: ALICE.path });
});

setup('setup bob', async ({ browser }) => {
  const page = await browser.newPage({
    storageState: undefined,
    baseURL: 'http://localhost:5173',
  });
  const app = createApp(page);
  await app.utils.loginOrSignUp(BOB);
  await page.context().storageState({ path: BOB.path });
});
