import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async fillText(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async selectOption(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector);
    } catch (error) {
      return false;
    }
  }

  async waitForElement(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  getPage(): Page {
    return this.page;
  }

  async checkCheckbox(selector: string): Promise<void> {
    await this.page.check(selector);
  }

  async uncheckCheckbox(selector: string): Promise<void> {
    await this.page.uncheck(selector);
  }

  async isCheckboxChecked(selector: string): Promise<boolean> {
    return await this.page.isChecked(selector);
  }

  async fillDatePicker(selector: string, date: string): Promise<void> {
    await this.page.fill(selector, date);
  }

  async getAttributeValue(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }
}

export default BasePage;
