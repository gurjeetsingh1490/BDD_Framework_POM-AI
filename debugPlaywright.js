const { chromium } = require('playwright');
(async ()=>{
  try {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const url = 'file:///D:/PlayWright_Typescript_Automation/BBD_POM_Automation/index.html';
    await page.goto(url);
    console.log('navigated');
    await page.fill('input[name="fullname"]', 'TEST');
    console.log('filled name');
    await page.close();
    await browser.close();
  } catch(e) {
    console.error('error', e);
  }
})();
