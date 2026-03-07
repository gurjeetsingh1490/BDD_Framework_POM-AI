import { chromium } from '@playwright/test';

async function inspectColors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://testautomationpractice.blogspot.com/');
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Get all elements related to colors
  console.log('=== Looking for color elements ===');
  
  // Try different search approaches
  const colorLabels = await page.locator('text=Colors:').all();
  console.log('Found color labels:', colorLabels.length);
  
  // Get HTML of the form area
  const formContent = await page.locator('//body').innerHTML();
  const colorsSection = formContent.substring(formContent.indexOf('Colors'), formContent.indexOf('Colors') + 1000);
  console.log('Colors section HTML:\n', colorsSection);
  
  // Find all inputs
  const allInputs = await page.locator('input[type="checkbox"]').all();
  console.log('\nTotal checkboxes found:', allInputs.length);
  
  // Check for color inputs
  for (let i = 0; i < allInputs.length; i++) {
    const input = allInputs[i];
    const value = await input.getAttribute('value');
    const name = await input.getAttribute('name');
    const id = await input.getAttribute('id');
    const label = await input.locator('..').textContent();
    console.log(`Checkbox ${i}: value=${value}, name=${name}, id=${id}`);
  }
  
  // Try to find by visible text
  const blueCheckbox = await page.locator('text=Blue').all();
  console.log('\nElements with text "Blue":', blueCheckbox.length);
  for (const el of blueCheckbox) {
    const tagName = await el.evaluate(e => e.tagName);
    const type = await el.getAttribute('type');
    const value = await el.getAttribute('value');
    console.log(`- Tag: ${tagName}, Type: ${type}, Value: ${value}`);
  }
  
  await browser.close();
}

inspectColors().catch(console.error);
