async function newPaymentCheckout(page,url,creditCard, cvvNum){
    await page.waitForURL(url + 'step=review')
    await page.waitForTimeout(2000)
    const duplicate = await page.isVisible('id=btnDisclaimerNext')
    if (duplicate){
      await page.locator('id=btnDisclaimerNext').click()
    }
    const stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]').nth(1)
    
    await stripeFrame.locator("id=payment-numberInput").fill(creditCard);

    const expiration_month = stripeFrame.locator("id=payment-expiryInput")
    await expiration_month.fill('10/26')

    const cvv = stripeFrame.locator("id=payment-cvcInput")
    await cvv.fill(cvvNum)
    const zip_code = stripeFrame.locator("id=payment-postalCodeInput")
    await zip_code.fill('12345')
    /*
    const cardholder_name = page.getByPlaceholder("Cardholder name")
    await cardholder_name.fill('John Smith')
    
    const zip_code = page.getByPlaceholder("ZIP code")
    await zip_code.fill('12345')
    */ 
}

module.exports = {newPaymentCheckout}