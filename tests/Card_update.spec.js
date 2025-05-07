const { test, expect } = require('@playwright/test');
const {deploy_url, email_test, Orders} = require('./urls');

test('Card update', async ({ page }) => {
    await page.goto(deploy_url + 'account/payment-method')
    await expect(page.getByTestId("updatePaymentMethodBtn")).toBeEnabled()
  
    await page.goto(deploy_url + 'account/payment-method/edit')
    await page.getByPlaceholder("Card number").fill("4111 1111 1111 1111")
    await page.getByPlaceholder("MM/YY").fill("10/26")
    await page.getByPlaceholder("CVV").fill("123")
    await page.getByPlaceholder("Cardholder name").fill("John Smith")
    await page.locator("id=btnSubmitPayment").click()
    await page.waitForURL('**/account/payment-method')
  })