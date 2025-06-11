const { test, expect } = require('@playwright/test');
const {deploy_url} = require('../urls');

test('Processing speeds appear and work', async({page}) => {
    var myDate = new Date(new Date(). getTime()+(10*24*60*60*1000));
    const datepicker_date = new Date(myDate);
    const date1 = datepicker_date.getDate();

    await page.goto(deploy_url + 'a/india')
  
    const arrival_date_visible = page.locator('[name="general.arrival_date"]')
    await expect(arrival_date_visible).toBeVisible()
    await arrival_date_visible.click()
    await expect(page.locator('.dp__outer_menu_wrap')).toBeVisible()
  
    await page.locator('.dp--future').filter({hasText: date1}).first().click()

    const continue_sidebar = page.locator('id=btnContinueSidebar')
    await expect(continue_sidebar).toBeEnabled()
    await continue_sidebar.click()
    await page.waitForURL('**/a/india#step=step_3a')
  
    await page.waitForTimeout(1000)
    const dob_day = page.locator('[name="applicant.0.dob.day"]')
    await dob_day.selectOption('13')
    const dob_month = page.locator('[name="applicant.0.dob.month"]')
    await dob_month.selectOption('7')
    const dob_year = page.locator('[name="applicant.0.dob.year"]')
    await dob_year.selectOption('2000')
    const name_applicant = page.locator('[name="applicant.0.first_name"]')
    await expect(name_applicant).toBeVisible()
    await name_applicant.fill('Test')
    
    await page.waitForTimeout(1000)
    const last_name = page.locator('[name="applicant.0.last_name"]')
    await last_name.fill('Test')
    await page.waitForTimeout(1000)
  
    await expect(continue_sidebar).toBeEnabled()
    await continue_sidebar.click()
    await page.waitForURL('**/a/india#step=step_3c')

    const passport_num = page.locator('[name="applicant.0.passport_num"]')
    await expect(passport_num).toBeVisible()
    await passport_num.fill('123456789')
    const passport_day = page.locator('[name="applicant.0.passport_expiration_date.day"]')
    await passport_day.selectOption('13')
    const passport_month = page.locator('[name="applicant.0.passport_expiration_date.month"]')
    await passport_month.selectOption('7')
    const passport_year = page.locator('[name="applicant.0.passport_expiration_date.year"]')
    await passport_year.selectOption('2030')
    await page.waitForTimeout(4000)
    
    const dropdown_country = page.locator('[name="applicant.0.port_of_arrival"]');
    await expect(dropdown_country).toBeVisible();
    await dropdown_country.click();
    const input_country = page.getByTestId('dropdown-applicant.0.port_of_arrival');

    await expect(input_country).toBeVisible();
    await input_country.fill('Ahmedabad Airport - Ahmedabad - AMD');
    await page.locator('//div[@value="Ahmedabad Airport - Ahmedabad - AMD"]').click()

    await expect(continue_sidebar).toBeEnabled()
    await continue_sidebar.click()
    await page.waitForURL('**/a/india#step=step_4')

    const standard = page.getByTestId('processing-standard')
    const rush = page.getByTestId('processing-rush')
    const super_rush = page.getByTestId('processing-super_rush')
    await expect(standard).toBeVisible()
    await expect(rush).toBeVisible()
    await expect(super_rush).toBeVisible()

    const sidebar_step_2 = page.getByTestId('sidebar-summary-breakdown')
    let sidebar_validations = ['India Tourist eVisa', '1 Traveler', '+ Government fees', '$ 10.25', '+ Standard, 4 days', '$ 79.99']

    sidebar_validations.forEach(async txt => await expect(sidebar_step_2).toContainText(txt))
    const correct_total = page.getByTestId('order-total')
    await expect(correct_total).toHaveText('90.24')

    await rush.click()
    await expect(continue_sidebar).toBeEnabled()

    sidebar_validations = ['India Tourist eVisa', '1 Traveler', '+ Government fees', '$ 10.25', '+ Rush, 2 days', '$ 99.99']
    sidebar_validations.forEach(async txt => await expect(sidebar_step_2).toContainText(txt))
    await expect(correct_total).toHaveText('110.24')

    await super_rush.click()
    await expect(continue_sidebar).toBeEnabled()

    sidebar_validations = ['India Tourist eVisa', '1 Traveler', '+ Government fees', '$ 10.25', '+ Super Rush, 30 hours', '$ 159.99']
    sidebar_validations.forEach(async txt => await expect(sidebar_step_2).toContainText(txt))
    await expect(correct_total).toHaveText('170.24')
})