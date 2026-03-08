import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormPage extends BasePage {
  // Selectors for form fields
  readonly nameFieldSelector;
  readonly emailFieldSelector = 'input[name="email"], input[placeholder="Email"], input[id="email"], input[type="email"]';
  readonly phoneFieldSelector = 'input[name="phone"], input[placeholder="Phone"], input[id="phone"], input[type="tel"]';
  readonly addressFieldSelector = "//label[text()='Address:']//following-sibling::textarea";
  
  readonly genderMaleCheckboxSelector = 'input[name="gender"][value="Male"], input[id*="male"], label:has-text("Male") input';
  readonly genderFemaleCheckboxSelector = 'input[name="gender"][value="Female"], input[id*="female"], label:has-text("Female") input';
  
  readonly daysSaturdayCheckboxSelector = 'input[name="days"][value="Saturday"], input[id*="saturday"], label:has-text("Saturday") input';
  readonly daysSundayCheckboxSelector = 'input[name="days"][value="Sunday"], input[id*="sunday"], label:has-text("Sunday") input';
  
  readonly countryDropdownSelector = 'select[name="country"], select[id="country"], select#countries';
  
  readonly colorsSelectSelector = 'select[id="colors"], select[name="colors"]';
  
  readonly datePickerSelector = 'input[name="datepicker"], input[id="datepicker"], input[type="date"], input[placeholder*="mm/dd/yyyy"]';
  
  readonly submitButtonSelector = 'button[type="submit"], button:has-text("Submit"), button:has-text("Register"), button:has-text("Save")';
  readonly clickStartButtonSelector = "//button[text()='START']";
  readonly seachBoxTextSelector="//input[@id='Wikipedia1_wikipedia-search-input']";
  readonly searchButtonSelector="//input[@type='submit']";
  readonly homeLinkSelector="(//a[text()='Home'])[1]";

  readonly playwrightPracticeSelector="//a[text()='PlaywrightPractice']";
  constructor(page: Page) {

    super(page);
    this.nameFieldSelector = 'input[id="name"]';
    
  }

  async enterName(name: string): Promise<void> {
    await this.page.fill(this.nameFieldSelector, name);
  }

  async enterEmail(email: string): Promise<void> {
    await this.page.fill(this.emailFieldSelector, email);
  }

  async enterPhone(phone: string): Promise<void> {
    await this.page.fill(this.phoneFieldSelector, phone);
  }

  async enterAddress(address: string): Promise<void> {
    try {
      // Try to fill as regular input first
      await this.page.fill(this.addressFieldSelector, address);
    } catch (error) {
      // If it's a textarea, try to fill using type instead
      await this.page.locator(this.addressFieldSelector).clear();
      await this.page.locator(this.addressFieldSelector).type(address);
    }
  }

  async selectGender(gender: string): Promise<void> {
    if (gender.toLowerCase() === 'male') {
      await this.page.check(this.genderMaleCheckboxSelector);
    } else if (gender.toLowerCase() === 'female') {
      await this.page.check(this.genderFemaleCheckboxSelector);
    }
  }

  async selectDay(day: string): Promise<void> {
    if (day.toLowerCase() === 'saturday') {
      await this.page.check(this.daysSaturdayCheckboxSelector);
    } else if (day.toLowerCase() === 'sunday') {
      await this.page.check(this.daysSundayCheckboxSelector);
    }
  }

  async selectCountry(country: string): Promise<void> {
    await this.page.selectOption(this.countryDropdownSelector, { label: country });
  }

  async selectColor(color: string): Promise<void> {
    try {
      const colorValue = color.toLowerCase(); // The select options use lowercase values
      
      // For multi-select, we use selectOption which handles the multiple attribute
      await this.page.selectOption(this.colorsSelectSelector, colorValue);
      console.log(`Selected "${color}" color successfully`);
    } catch (error) {
      console.error(`Error selecting color ${color}:`, error);
      throw error;
    }
  }

  async selectDatepicker(date: string): Promise<void> {
    await this.page.fill(this.datePickerSelector, date);
  }

  async submitForm(): Promise<void> {
    await this.page.click(this.submitButtonSelector);
  }

  async isFormDisplayed(): Promise<boolean> {
    return await this.isVisible(this.nameFieldSelector);
  }
  async clickStartButton(): Promise<void>{
    await this.page.click(this.clickStartButtonSelector)
  }
  async searchBoxText(search:string):Promise<void>{
    await this.page.fill(this.seachBoxTextSelector,search)
  }
 async clickSearchButton(): Promise<void>{
    await this.page.click(this.searchButtonSelector)
  }
  async clickHomeLink(): Promise<void>{
    await this.page.click(this.homeLinkSelector)
  }
async clickPlaywrightPractice(): Promise<void>{
    await this.page.click(this.playwrightPracticeSelector)
}


}

export default FormPage;
