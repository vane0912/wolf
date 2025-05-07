const { test, expect } = require('@playwright/test');
const {deploy_url, email_test, Orders} = require('./urls');

test('Password_test', async ({ page }) => {
    await page.goto(deploy_url + 'account/settings')
    const user = page.locator('id=loggedInUserContainer')
    await expect(user).toBeVisible()
    await user.click()
    const btn_logout = page.locator('id=btnLogout')
    await expect(btn_logout).toBeVisible()
    await btn_logout.click()
    await page.goto(deploy_url + 'login')
    await page.waitForURL('**/login')
    const email = page.locator('id=email_login_input')
    await expect(email).toBeVisible()
    await email.fill(email_test)
    const continue_login = page.locator('id=continue_button')
    await expect(continue_login).toBeEnabled()
    await continue_login.click()
    const password = page.locator('id=password_login_input')
    await expect(password).toBeVisible()
    await password.fill('testivisa5!')
  
    const login_cta = page.locator('id=log_in_button')
    await expect(login_cta).toBeEnabled()
    await login_cta.click()
    await page.waitForNavigation({waitUntil: 'load'})
  })