import { test as setup } from './utils/test';
import { cleandb } from './cleandb';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, app }) => {
  await cleandb({ removeUsers: true });
  await app.signUp.navigate();
  await app.signUp.fillSignUp();
  await app.profile.expectToBeVisible();
  await page.context().storageState({ path: authFile });
});
