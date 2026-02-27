import { Page, expect } from '@playwright/test';
import logger from './logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL with retry logic
   */
  async goto(url: string, retries = 3): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        logger.info(`Navigating to: ${url} (attempt ${i + 1}/${retries})`);
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        logger.info(`Successfully navigated to: ${url}`);
        return;
      } catch (error) {
        logger.warn(`Navigation failed (attempt ${i + 1}): ${error}`);
        if (i === retries - 1) {
          logger.error(`Failed to navigate to ${url} after ${retries} attempts`);
          throw error;
        }
        await this.page.waitForTimeout(1000 * (i + 1)); // exponential backoff
      }
    }
  }

  /**
   * Fill input field with retry logic
   */
  async fillInput(selector: string, text: string, retries = 2): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        logger.info(`Filling input [${selector}] with text: "${text}"`);
        await this.page.fill(selector, text);
        logger.info(`Successfully filled input [${selector}]`);
        return;
      } catch (error) {
        logger.warn(`Failed to fill input (attempt ${i + 1}): ${error}`);
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
  }

  /**
   * Click element with retry logic
   */
  async clickElement(selector: string, retries = 2): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        logger.info(`Clicking element [${selector}]`);
        await this.page.click(selector);
        logger.info(`Successfully clicked element [${selector}]`);
        return;
      } catch (error) {
        logger.warn(`Failed to click element (attempt ${i + 1}): ${error}`);
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
  }

  /**
   * Get text content with retry logic
   */
  async getTextContent(selector: string, retries = 2): Promise<string | null> {
    for (let i = 0; i < retries; i++) {
      try {
        logger.info(`Getting text content from [${selector}]`);
        const text = await this.page.textContent(selector);
        logger.info(`Retrieved text: "${text}"`);
        return text;
      } catch (error) {
        logger.warn(`Failed to get text content (attempt ${i + 1}): ${error}`);
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
    return null;
  }

  /**
   * Wait for selector with retry logic
   */
  async waitForElement(selector: string, timeout = 30000, retries = 2): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        logger.info(`Waiting for element [${selector}] (timeout: ${timeout}ms)`);
        await this.page.waitForSelector(selector, { timeout });
        logger.info(`Element [${selector}] found`);
        return;
      } catch (error) {
        logger.warn(`Element not found (attempt ${i + 1}): ${error}`);
        if (i === retries - 1) throw error;
      }
    }
  }

  /**
   * Assert element is visible
   */
  async assertElementVisible(selector: string): Promise<void> {
    try {
      logger.info(`Asserting element [${selector}] is visible`);
      await expect(this.page.locator(selector)).toBeVisible();
      logger.info(`✓ Element [${selector}] is visible`);
    } catch (error) {
      logger.error(`✗ Element [${selector}] is not visible: ${error}`);
      throw error;
    }
  }

  /**
   * Assert text contains
   */
  async assertTextContains(selector: string, expectedText: string): Promise<void> {
    try {
      logger.info(`Asserting element [${selector}] contains text: "${expectedText}"`);
      await expect(this.page.locator(selector)).toContainText(expectedText);
      logger.info(`✓ Element [${selector}] contains expected text`);
    } catch (error) {
      logger.error(`✗ Assertion failed: ${error}`);
      throw error;
    }
  }
}

export default BasePage;
