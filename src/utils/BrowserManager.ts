import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

class BrowserManager {
  private static browser: Browser;
  private static context: BrowserContext;
  private static page: Page;
  private static videoPath: string | null = null;

  static async launchBrowser(browserType: string = 'chromium'): Promise<Page> {
    try {
      const headlessEnv = process.env.HEADLESS;
      const headless = headlessEnv ? headlessEnv.toLowerCase() === 'true' : false; // default false
      const args = [];
      if (!headless) {
        args.push('--start-maximized');
      }
      let launchOption: any = {
        headless,
        args
      };

      console.log('Launching browser with options', { browserType, launchOption });
      if (browserType.toLowerCase() === 'firefox') {
        this.browser = await firefox.launch(launchOption);
      } else if (browserType.toLowerCase() === 'webkit') {
        this.browser = await webkit.launch(launchOption);
      } else {
        // always chromium default for tests
        this.browser = await chromium.launch(launchOption);
      }
      // listen for close events to debug unexpected shutdown
      this.browser.on('disconnected', () => {
        console.warn('Browser disconnected event fired');
      });

      // Ensure videos directory exists
      const videosDir = path.join(process.cwd(), 'test-results', 'videos');
      if (!fs.existsSync(videosDir)) {
        fs.mkdirSync(videosDir, { recursive: true });
      }

      // Generate video file path
      this.videoPath = path.join(videosDir, `test-${Date.now()}.webm`);

      // create new context with video recording enabled
      this.context = await this.browser.newContext({
        recordVideo: {
          dir: videosDir
        }
      });

      this.page = await this.context.newPage();
      return this.page;
    } catch (error) {
      console.error('Error launching browser:', error);
      throw error;
    }
  }

  static getPage(): Page {
    return this.page;
  }

  static getVideoPath(): string | null {
    return this.videoPath;
  }

  static getContext(): BrowserContext {
    return this.context;
  }

  static async closeBrowser(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export default BrowserManager;
