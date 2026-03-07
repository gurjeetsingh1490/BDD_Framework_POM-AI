import { Page } from '@playwright/test';

export class TestUtils {
  static async waitForElementToBeVisible(page: Page, selector: string, timeout: number = 30000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  static async waitForElementToBeHidden(page: Page, selector: string, timeout: number = 30000): Promise<void> {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  static async waitForText(page: Page, text: string, timeout: number = 30000): Promise<void> {
    await page.waitForFunction(
      (searchText: string) => {
        return document.body.innerText.includes(searchText);
      },
      text,
      { timeout }
    );
  }

  static async getTextContent(page: Page, selector: string): Promise<string> {
    const textContent = await page.textContent(selector);
    return textContent?.trim() || '';
  }

  static async getAllTextContent(page: Page, selector: string): Promise<string[]> {
    const elements = await page.locator(selector).allTextContents();
    return elements.map((text) => text.trim());
  }

  static async verifyElementPresence(page: Page, selector: string): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  static async verifyText(page: Page, selector: string, expectedText: string): Promise<boolean> {
    const text = await this.getTextContent(page, selector);
    return text === expectedText || text.includes(expectedText);
  }

  static async takeScreenshot(page: Page, fileName: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `test-results/screenshots/${fileName}-${timestamp}.png`;
    await page.screenshot({ path, fullPage: true });
    console.log(`Screenshot saved: ${path}`);
  }

  static async clearAndFill(page: Page, selector: string, text: string): Promise<void> {
    await page.click(selector);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.type(selector, text);
  }

  static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async scrollToElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  static async hoverElement(page: Page, selector: string): Promise<void> {
    await page.hover(selector);
  }

  static async doubleClickElement(page: Page, selector: string): Promise<void> {
    await page.dblclick(selector);
  }

  static async rightClickElement(page: Page, selector: string): Promise<void> {
    await page.click(selector, { button: 'right' });
  }

  static async fillForm(page: Page, formData: Record<string, string>): Promise<void> {
    for (const [selector, value] of Object.entries(formData)) {
      const element = await page.locator(selector).first();
      const type = await element.getAttribute('type');

      if (type === 'checkbox' || type === 'radio') {
        await element.check();
      } else if (type && (type === 'text' || type === 'email' || type === 'tel' || type === 'password')) {
        await element.fill(value);
      }
    }
  }
}

export default TestUtils;
