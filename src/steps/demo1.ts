import { Given, When, Then } from '@cucumber/cucumber';
import FormPage from '../pages/FormPage';
import BrowserManager from '../utils/BrowserManager';

let formPage: FormPage;

When('i open the URL {string}', async function(url: string) {
  const page = BrowserManager.getPage();
  formPage = new FormPage(page);
  await formPage.navigateTo(url);
  console.log(`Successfully navigated to URL: ${url}`);
});

When('i enter {string} in the {string} textfield', async function(value: string, fieldName: string) {
  const page = BrowserManager.getPage();
  formPage = new FormPage(page);
  
  if (fieldName.toLowerCase().includes('name')) {
    await formPage.enterName(value);
    console.log(`Entered "${value}" in Name field`);
  }
});

When('i click on {string} button', async function(buttonText: string) {
  const page = BrowserManager.getPage();
  formPage = new FormPage(page);
  
  if (buttonText === 'START') {
    await formPage.clickStartButton();
    console.log('Clicked on START button');
  };
});

When('i enter {string} in the search box', async function(value: string) {
  const page = BrowserManager.getPage();
  formPage = new FormPage(page);
  await formPage.searchBoxText(value);
  console.log(`Entered "${value}" in search box`);
});

Then('i click on {string}', async function(buttonText: string) {
  const page = BrowserManager.getPage();
  formPage = new FormPage(page);
  
  if (buttonText === 'Search button') {
    await formPage.clickSearchButton();
    console.log('Clicked on Search button');
  }
});
When ('i click on {string} link',async function (homeLink: string) {
  const page = BrowserManager.getPage();
  formPage = new FormPage(page);
    if (homeLink === 'Home') {
    await formPage.clickHomeLink();
    console.log('Clicked on Home link');
  }
});

When('i clicked on {string} hyperlink', async function (playwrightPracticeLnk: string) {
  const page = BrowserManager.getPage();
  formPage = new FormPage(page);
  if (playwrightPracticeLnk === 'PlaywrightPractice') {
    await formPage.clickPlaywrightPractice();
    console.log('Clicked on playwrightpractice link');
  }
});