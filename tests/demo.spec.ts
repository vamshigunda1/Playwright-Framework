import { test, expect } from '@playwright/test';
import BasePage from '../utils/BasePage';
import logger from '../utils/logger';

/**
 * Demo Page Object showing BasePage usage
 */
class DemoPage extends BasePage {
  readonly heading = 'h1';
  readonly paragraph = 'p';

  async verifyPageLoaded(): Promise<void> {
    logger.info('Verifying page is loaded');
    await this.assertElementVisible(this.heading);
    logger.info('✓ Page loaded successfully');
  }
}

test.describe('Demo Tests with Enterprise Framework', () => {
  test.beforeEach(({ page }) => {
    logger.info('=== Test Started ===');
  });

  test.afterEach(({ page }, testInfo) => {
    logger.info(`Test Status: ${testInfo.status}`);
    logger.info('=== Test Completed ===\n');
  });

  test('verify example.com loads successfully', async ({ page }) => {
    const demo = new DemoPage(page);
    
    logger.info('Navigating to example.com');
    await demo.goto('https://example.com');
    
    logger.info('Verifying page elements');
    await demo.verifyPageLoaded();
    
    const headingText = await demo.getTextContent('h1');
    logger.info(`Retrieved heading: "${headingText}"`);
    expect(headingText).toBeTruthy();
    
    logger.info('✓ All assertions passed');
  });

  test('demonstrate retry logic on example.com', async ({ page }) => {
    const demo = new DemoPage(page);
    await demo.goto('https://example.com');
    
    logger.info('Performing multiple sequential actions');
    
    // These actions will use the built-in retry logic from BasePage
    const text = await demo.getTextContent('h1');
    expect(text).toContain('Example');
    
    await demo.assertElementVisible('h1');
    
    logger.info('✓ All retry-enabled actions completed successfully');
  });
});