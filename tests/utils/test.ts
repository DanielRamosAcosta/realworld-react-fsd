import { test as base } from '@playwright/test';
import { createApp } from './pom/createApp';
import { User, userForIndex } from './fixtures/users';

const getParallelIndex = () => test.info().parallelIndex;

export const test = base.extend<
  { app: ReturnType<typeof createApp>; user: User },
  { workerStorageState: string }
>({
  app: async ({ page }, use) => {
    await use(createApp(page));
  },
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  user: async ({}, use) => {
    const id = getParallelIndex();
    const user = userForIndex(id);
    await use(user);
  },
  workerStorageState: [
    async ({ browser }, use) => {
      const id = getParallelIndex();
      const user = userForIndex(id);
      const app = await user.instance(browser, 'http://localhost:5173');
      await app.utils.loginOrSignUp(user);
      await app.page.context().storageState({ path: user.path });
      await use(user.path);
    },
    { scope: 'worker' },
  ],
});
