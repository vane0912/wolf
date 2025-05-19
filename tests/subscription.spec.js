const { test, expect } = require('@playwright/test');
const {deploy_url, email_test} = require('./urls');

test.skip('Purchase Subscription', async({ page }) => {
    for(let i = 0; 2 > i; i++){
      await page.goto(deploy_url + 'a/turkey');
      const dropdown_country =  page.getByTestId('filter-value');
    
      await expect(dropdown_country).toBeVisible();
      await dropdown_country.click();
      const input_country = page.getByTestId('dropdown-general.common_nationality_country');
    
      await expect(input_country).toBeVisible();
      await input_country.fill('Mexico');
      await page.getByRole("option", {name: 'Mexico flag Mexico'}).click()
    
      const selector_products = page.getByTestId('dropdown-general.visa_type_id');
      await selector_products.selectOption('38')
    
      const continue_step1 = page.locator('id=btnContinueSidebar')
      await expect(continue_step1).toBeEnabled()
      await continue_step1.click()
      await page.waitForURL('**/a/turkey#step=step_2')
      
      const arrival_date_visible = page.locator('[name="general.arrival_date"]')
      await expect(arrival_date_visible).toBeVisible()
      await arrival_date_visible.click()
      await expect(page.locator('.dp__outer_menu_wrap')).toBeVisible()
      await page.locator('[data-dp-element="action-next"]').click()
      await page.locator('.dp--future').filter({hasText: '12'}).first().click()
      await expect(page.locator('[name="general.email"]')).toBeVisible()
    
      const continue_sidebar = page.locator('id=btnContinueSidebar')
      await expect(continue_sidebar).toBeEnabled()
      await continue_sidebar.click()
      await page.waitForURL('**/a/turkey#step=step_3a')
      
      const name_applicant = page.getByPlaceholder("John William")
      await expect(name_applicant).toBeVisible()
      await name_applicant.fill('Test')
    
      const last_name = page.getByPlaceholder("Smith").first()
      await last_name.fill('Test')
    
      const dob_day = page.locator('[name="applicant.0.dob.day"]')
      await dob_day.selectOption('13')
    
      const dob_month = page.locator('[name="applicant.0.dob.month"]')
      await dob_month.selectOption('7')
    
      const dob_year = page.locator('[name="applicant.0.dob.year"]')
      await dob_year.selectOption('2000')
    
      await expect(continue_sidebar).toBeEnabled()
      await continue_sidebar.click()
      await page.waitForURL('**/a/turkey#step=step_3c')
      
      const passport_num = page.locator('[name="applicant.0.passport_num"]')
      await expect(passport_num).toBeVisible()
      await passport_num.fill('123456789')
    
      const passport_day = page.locator('[name="applicant.0.passport_expiration_date.day"]')
      await passport_day.selectOption('13')
    
      const passport_month = page.locator('[name="applicant.0.passport_expiration_date.month"]')
      await passport_month.selectOption('7')
    
      const passport_year = page.locator('[name="applicant.0.passport_expiration_date.year"]')
      await passport_year.selectOption('2030')
    
      await expect(continue_sidebar).toBeEnabled()
      await continue_sidebar.click()
      await page.waitForURL('**/a/turkey#step=step_4')
    
      await expect(continue_sidebar).toBeEnabled()
      await continue_sidebar.click()
      await page.waitForURL('**/a/turkey#step=review')
      await page.waitForTimeout(2000)
      const duplicate = await page.isVisible('id=btnDisclaimerNext')
      if (duplicate){
        await page.locator('id=btnDisclaimerNext').click()
      }
      await expect(continue_sidebar).toBeEnabled()
      await continue_sidebar.click()
  
      if(i === 1){
        const free_order = page.locator('.card-body')
        await expect(free_order).toBeVisible()
          
        await expect(free_order).toHaveText('Your iVisa+ Subscription covers the total cost of your applicationSubmit order')
        const payment_btn = page.locator('id=btnSubmitPayment')
        await expect(payment_btn).toBeVisible()
        await expect(payment_btn).toBeEnabled()
        await payment_btn.click()
      }else{
        const payment_btn = page.locator('id=btnSubmitPayment')
        await expect(payment_btn).toBeVisible()
        await expect(payment_btn).toBeEnabled()
        await payment_btn.click()
      }
      await page.waitForNavigation({waitUntil: 'load'})
      await page.getByPlaceholder('111-222-3333').fill('11111111')
      await page.getByTestId('boolean-WhatsApp').click()
    
      const next_btn = page.locator('id=btnContinueUnderSection')
      await page.waitForTimeout(1000)
      await expect(next_btn).toBeEnabled()
      await next_btn.click()
      await page.waitForNavigation({waitUntil: 'load'})
    
      await expect(page.getByTestId('boolean-Male')).toBeEnabled()
      await page.waitForTimeout(1000)
      await page.getByTestId('boolean-Male').click()
      await page.waitForTimeout(1000)
      await expect(next_btn).toBeEnabled()
      await next_btn.click()
    
      await page.waitForNavigation({waitUntil: 'load'})
      const passport_issue_day = page.locator('[name="applicant.0.passport_issued_date.day"]')
      await passport_issue_day.selectOption('13')
      await page.waitForTimeout(1000)
    
      const passport_issue_month = page.locator('[name="applicant.0.passport_issued_date.month"]')
      await passport_issue_month.selectOption('7')
      await page.waitForTimeout(1000)
      const passport_issue_year = page.locator('[name="applicant.0.passport_issued_date.year"]')
      await passport_issue_year.selectOption('2020')
      await page.waitForTimeout(1000)
    
      const submit_post_payment = page.locator('id=btnSubmitApplication')
      await expect(submit_post_payment).toBeEnabled()
      await submit_post_payment.click()
      await page.waitForNavigation({waitUntil: 'load'})
    
      const track_application = page.locator('#trackApplication')
      await expect(track_application).toBeVisible()
      await track_application.click()
    
      await expect(page.locator("#h1-tag-container")).toBeVisible()
      if(i === 0){
        const open_modal = page.getByTestId('open-subscription-modal-button')
        await expect(open_modal).toBeEnabled()
        await open_modal.click()
      
        await expect(page.locator('#iVisaPlusContent')).toBeVisible()
        const buy_subscription_cta = page.getByTestId("purchase-subscription-button")
        await expect(buy_subscription_cta).toBeEnabled()
        await buy_subscription_cta.click()
      
        const subscription_purchased = page.getByTestId('close-modal')
        await subscription_purchased.click()
      }
    }
  })