import { test as base } from '@playwright/test';
import { createApp } from './pom/createApp';

export const test = base.extend<{ app: ReturnType<typeof createApp> }>({
  app: async ({ page }, use) => {
    await use(createApp(page));
  },
});
