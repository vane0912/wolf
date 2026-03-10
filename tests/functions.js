async function newPaymentCheckout(page,url,creditCard, cvvNum){
  await page.waitForURL(url + 'step=review')
  await page.waitForTimeout(2000)
  const duplicate = await page.isVisible('id=btnDisclaimerNext')
  if (duplicate){
    await page.locator('id=btnDisclaimerNext').click()
  }
  await page.getByPlaceholder("Card number").fill(creditCard);
  const expiration_month = page.getByPlaceholder("MM/YY")
  await expiration_month.fill('10/26')
  const cvv = page.getByPlaceholder("CVV")
  await cvv.fill(cvvNum)
}

module.exports = {newPaymentCheckout}