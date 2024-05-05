import { Browser } from '@playwright/test';
import { createApp } from '../pom/createApp';

async function createContext(browser: Browser, storageState: string) {
  const context = await browser.newContext({ storageState });
  const page = await context.newPage();
  return {
    ...createApp(page),
    page,
    context,
  };
}

export const ALICE = {
  name: 'Alice',
  email: 'alice@example.com',
  password: 'password',
  path: 'playwright/.auth/alice.json',
  instance: (browser: Browser) => createContext(browser, ALICE.path),
};

export const BOB = {
  name: 'Bob Mayer',
  email: 'bob@example.com',
  password: 'password',
  path: 'playwright/.auth/bob.json',
  instance: (browser: Browser) => createContext(browser, BOB.path),
};

export function userFromWorker(id: string | number): typeof ALICE {
  const user = {
    name: `Person ${id}`,
    email: `person+${id}@example.com`,
    password: '123456789',
    path: `playwright/.auth/${id}.json`,
  };
  return {
    ...user,
    instance: async (_: Browser) => {
      throw new Error('Unimplemented method userFromWorker#instance');
    },
  };
}
