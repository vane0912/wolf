import test, { test as setup, expect } from '@playwright/test';
import {deploy_url, email_test} from './urls'
import * as appFunctions from './functions'
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page, context }) => {
  if(!fs.existsSync(authFile)){
    test.slow()
    await context.addCookies([
      {
        name: 'default_currency',
        value: 'USD',
        url: deploy_url
      },
    ]);

    await page.goto(`${deploy_url}a/turkey`);
    await appFunctions.step_1(page);
    await appFunctions.step_1(page)
    await page.waitForTimeout(2000)
    const continue_sidebar = page.getByRole("button").getByText("Continue")
    await continue_sidebar.click()
    await page.waitForURL("**/a/turkey/passport-details/0")
    await page.waitForTimeout(2000)
    await appFunctions.step_2(page, continue_sidebar)
    await page.waitForURL("**/a/turkey/address-details/0")
    await page.waitForTimeout(2000)
    await appFunctions.step_3c(page, continue_sidebar)
    await page.waitForURL("**/a/turkey/additional-info/0")
    await page.waitForTimeout(2000)
    await appFunctions.additionalInfo(page, continue_sidebar)
    await page.waitForURL("**/a/turkey/traveler-review")
    await page.waitForTimeout(2000)
    await continue_sidebar.click()
    await page.waitForURL("**/a/turkey/contact-details")
    await page.waitForTimeout(2000)
    await expect(page.locator('[name="general.email"]')).toBeVisible()
    await page.locator('[name="general.email"]').fill(email_test)
    await continue_sidebar.click()
    await page.waitForURL("**/a/turkey/checkout")
    await page.waitForTimeout(2000)
    await appFunctions.newPaymentCheckout(page, '6011 1111 1111 1117', '123')

    const payment_btn = page.locator('id=btnSubmitPayment')
    await expect(payment_btn).toBeVisible()
    await expect(payment_btn).toBeEnabled()
    await payment_btn.click()

    await page.waitForNavigation({waitUntil: 'load'})
    await page.waitForTimeout(2000)
    // Set password
    await page.goto(deploy_url + 'account/settings/security')
    const password_set = page.locator('id=new_password')
    await expect(password_set).toBeVisible()
    await password_set.fill('testivisa5!')
    const password_set_confirm = page.locator('id=password_repeat')
    await password_set_confirm.fill('testivisa5!')
    await page.getByTestId('updatePasswordBtn').click()
    const confirmation_modal = page.locator('.swal-overlay--show-modal')
    await expect.soft(confirmation_modal).toBeVisible()

    await page.context().storageState({ path: authFile });
  }
});