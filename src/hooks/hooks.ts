import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import BrowserManager from '../utils/BrowserManager';
import * as fs from 'fs';
import * as path from 'path';

// set default step timeout to 60 seconds (was 5s)
setDefaultTimeout(60 * 1000);

// Store browser instance globally for step definitions
let globalBrowser: any = null;

BeforeAll(async function() {
  console.log('===== Test Execution Started =====');
});

Before({ timeout: 60 * 1000 }, async function() {
  console.log('Starting new test scenario...');
  
  // Ensure directories exist
  const screenshotsDir = 'test-results/screenshots';
  const videosDir = 'test-results/videos';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }
  
  const page = await BrowserManager.launchBrowser('chromium');
  globalBrowser = page;
  // Store page in world object for use in step definitions
  this.page = page;
});

// Consolidated After hook - captures screenshots and videos for ALL tests (pass or fail)
After({ timeout: 60 * 1000 }, async function(scenario) {
  const testName = scenario.pickle.name;
  const timestamp = Date.now();
  const status = scenario.result?.status || 'UNKNOWN';
  
  console.log(`\n===== Test Teardown: ${testName} [${status}] =====`);

  try {
    const page = BrowserManager.getPage();
    
    // Capture screenshot for ALL tests (pass or fail)
    if (page) {
      const screenshotPath = `test-results/screenshots/${testName}-${timestamp}.png`;
      try {
        await page.screenshot({ path: screenshotPath });
        console.log(`✓ Screenshot captured: ${screenshotPath}`);
      } catch (error) {
        console.warn('Warning: Could not capture screenshot:', error);
      }
    }
  } catch (error) {
    console.warn('Error during screenshot capture:', error);
  }

  // Close and save video for ALL tests (pass or fail)
  try {
    const context = BrowserManager.getContext();
    if (context) {
      // Close the page to finalize the video recording
      const pages = context.pages();
      for (const page of pages) {
        await page.close().catch(() => {}); // Ignore errors
      }
      
      // Save the video
      const videoSavePath = `test-results/videos/${testName}-${timestamp}.webm`;
      try {
        await context.close();
        console.log(`✓ Video saved: ${videoSavePath}`);
      } catch (error) {
        console.warn('Warning: Could not save video:', error);
      }
    }
  } catch (error) {
    console.warn('Error during video saving:', error);
  }

  // Close browser
  try {
    await BrowserManager.closeBrowser();
  } catch (err) {
    console.warn('Warning: Error closing browser:', err);
  }
  
  console.log(`Browser closed, test scenario complete\n`);
});

AfterAll(async function() {
  console.log('===== Test Execution Completed =====');
});

// Export to make page available to step definitions
export { globalBrowser };
