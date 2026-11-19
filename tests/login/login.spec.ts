import { test, expect } from '../../src/fixtures/test';
import { USERS } from '../../src/data/users';

test.describe('Login', () => {
  test('standard user can log in', { tag: ['@DEMOTC-1', '@smoke'] }, async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('login fails with an invalid password', { tag: '@DEMOTC-2' }, async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.invalidPassword);

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).not.toHaveURL(/inventory/);
  });
});
