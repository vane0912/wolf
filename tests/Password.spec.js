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

test('Magic login link', async ({ page,browser }) => {
    await page.goto(deploy_url + 'account/settings')
    const user = page.locator('id=loggedInUserContainer')
    await expect(user).toBeVisible()
    await user.click()
    const btn_logout = page.locator('id=btnLogout')
    await expect(btn_logout).toBeVisible()
    await btn_logout.click()
    await page.goto(deploy_url + 'login')
    await page.waitForURL('**/login')
    const email_input = page.locator('id=email_login_input')
    await expect(email_input).toBeVisible()
    await email_input.fill(email_test)
    const continue_login = page.locator('id=continue_button')
    await expect(continue_login).toBeEnabled()
    await continue_login.click()
    
    await page.locator("id=magic_login_link").click()
    await page.waitForTimeout(2000)
    await expect(page.getByText("Check your email, we sent a password free login link")).toBeVisible()

    const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'testivisa5!',
        },
    });
    const email = await context.newPage();
    await email.goto(deploy_url + 'mail')
    await email.getByText("Here's your automatic login link").first().click()
    await expect(email.locator(".messageHeaders")).toBeVisible()
    await expect(email.locator(".messageHeaders")).toContainText(email_test)
    const iframe = email.frameLocator('iframe');
    const [newTab] = await Promise.all([
      email.context().waitForEvent('page'),
      iframe.getByText('Log in').click(),
    ]);

    await newTab.waitForLoadState()
    const new_tab_user = newTab.locator('id=loggedInUserContainer')
    await expect(new_tab_user).toBeVisible()
})