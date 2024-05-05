import { test as base } from '@playwright/test';
import { createApp } from './pom/createApp';
import fs from 'fs';
import { userFromWorker } from './fixtures/users';

type User = {
  name: string;
  email: string;
  password: string;
};

export const test = base.extend<
  { app: ReturnType<typeof createApp> },
  { workerStorageState: string; user: User }
>({
  app: async ({ page }, use) => {
    await use(createApp(page));
  },
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  user: [
    async ({ browser: _ }, use) => {
      const id = test.info().parallelIndex;
      const user = userFromWorker(id);
      await use(user);
    },
    { scope: 'worker' },
  ],
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const user = userFromWorker(id);
      const path = `playwright/.auth/${id}.json`;

      if (fs.existsSync(path)) {
        await use(path);
        return;
      }

      const page = await browser.newPage({
        storageState: undefined,
        baseURL: 'http://localhost:5173',
      });
      const app = createApp(page);
      await app.utils.loginOrSignUp(user);
      await page.context().storageState({ path: user.path });
      await page.close();
      await use(path);
    },
    { scope: 'worker' },
  ],
});
