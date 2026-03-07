import { Given, When, Then } from '@cucumber/cucumber';
import FormPage from '../pages/FormPage';
import BrowserManager from '../utils/BrowserManager';

let formPage: FormPage;

Given('I open the URL {string}', async function(url: string) {
  try {
    // If given a Windows path or local path, convert to file URL
    let target = url;

    // add index.html when a directory is provided
    if ((url.includes(':\\') || url.startsWith('D:') || url.startsWith('d:')) && !/\.[a-zA-Z0-9]+$/.test(url)) {
      // path doesn't end with an extension, treat as folder
      target = url.replace(/\\$/,'') + '\\index.html';
    }

    if (target.includes(':\\') || target.startsWith('D:') || target.startsWith('d:')) {
      console.log(`Opening file path as local file: ${target}`);
      const fileUrl = 'file:///' + target.replace(/\\/g, '/');
      const page = BrowserManager.getPage();
      formPage = new FormPage(page);
      await formPage.navigateTo(fileUrl);
    } else {
      const page = BrowserManager.getPage();
      formPage = new FormPage(page);
      await formPage.navigateTo(target);
    }
    console.log(`Successfully navigated to URL: ${target}`);
  } catch (error) {
    console.error(`Error navigating to URL: ${url}`, error);
    throw error;
  }
});

When('I enter {string} in the {string} field', async function(value: string, fieldName: string) {
  try {
    const page = BrowserManager.getPage();
    formPage = new FormPage(page);

    const fieldLower = fieldName.toLowerCase().replace(':', '').trim();

    if (fieldLower.includes('name')) {
      await formPage.enterName(value);
      console.log(`Entered "${value}" in Name field`);
    } else if (fieldLower.includes('email')) {
      await formPage.enterEmail(value);
      console.log(`Entered "${value}" in Email field`);
    } else if (fieldLower.includes('phone')) {
      await formPage.enterPhone(value);
      console.log(`Entered "${value}" in Phone field`);
    } else if (fieldLower.includes('address')) {
      await formPage.enterAddress(value);
      console.log(`Entered "${value}" in Address field`);
    } else {
      console.warn(`Field "${fieldName}" not recognized`);
    }
  } catch (error) {
    console.error(`Error entering text in field: ${fieldName}`, error);
    throw error;
  }
});

When('I select {string} from the {string} checkbox', async function(value: string, fieldName: string) {
  try {
    const page = BrowserManager.getPage();
    formPage = new FormPage(page);

    const fieldLower = fieldName.toLowerCase().replace(':', '').trim();

    if (fieldLower.includes('gender')) {
      await formPage.selectGender(value);
      console.log(`Selected "${value}" from Gender checkbox`);
    } else if (fieldLower.includes('day')) {
      await formPage.selectDay(value);
      console.log(`Selected "${value}" from Days checkbox`);
    } else {
      console.warn(`Checkbox field "${fieldName}" not recognized`);
    }
  } catch (error) {
    console.error(`Error selecting checkbox: ${fieldName}`, error);
    throw error;
  }
});

When('I select {string} from the {string} dropdown field', async function(value: string, fieldName: string) {
  try {
    const page = BrowserManager.getPage();
    formPage = new FormPage(page);

    const fieldLower = fieldName.toLowerCase().replace(':', '').trim();

    if (fieldLower.includes('country')) {
      await formPage.selectCountry(value);
      console.log(`Selected "${value}" from Country dropdown`);
    } else {
      console.warn(`Dropdown field "${fieldName}" not recognized`);
    }
  } catch (error) {
    console.error(`Error selecting dropdown: ${fieldName}`, error);
    throw error;
  }
});

When('I select {string} from the {string} checklist', async function(value: string, fieldName: string) {
  try {
    const page = BrowserManager.getPage();
    formPage = new FormPage(page);

    const fieldLower = fieldName.toLowerCase().replace(':', '').trim();

    if (fieldLower.includes('color')) {
      await formPage.selectColor(value);
      console.log(`Selected "${value}" from Colors checklist`);
    } else {
      console.warn(`Checklist field "${fieldName}" not recognized`);
    }
  } catch (error) {
    console.error(`Error selecting checklist: ${fieldName}`, error);
    throw error;
  }
});

When('I enter or select {string} from the {string} date picker field', async function(date: string, fieldName: string) {
  try {
    const page = BrowserManager.getPage();
    formPage = new FormPage(page);

    const fieldLower = fieldName.toLowerCase().replace(':', '').trim();

    if (fieldLower.includes('date')) {
      await formPage.selectDatepicker(date);
      console.log(`Selected date "${date}" from Date Picker`);
    } else {
      console.warn(`Date picker field "${fieldName}" not recognized`);
    }
  } catch (error) {
    console.error(`Error selecting date picker: ${fieldName}`, error);
    throw error;
  }
});

Then('The form should be displayed', async function() {
  try {
    const page = BrowserManager.getPage();
    formPage = new FormPage(page);
    const isDisplayed = await formPage.isFormDisplayed();
    if (!isDisplayed) {
      throw new Error('Form is not displayed');
    }
    console.log('Form is displayed successfully');
  } catch (error) {
    console.error('Error: Form not displayed', error);
    throw error;
  }
});

Then('I should see a success message', async function() {
  try {
    const page = BrowserManager.getPage();
    const successMessage = await page.locator('text=Success|Thank You|Submitted|Registration Complete').first();
    if (!successMessage) {
      throw new Error('Success message not found');
    }
    console.log('Success message is visible');
  } catch (error) {
    console.error('Error: Success message not found', error);
    throw error;
  }
});
