import { test, expect } from '@playwright/test';
import { AmazonHomePage } from '../pages/AmazonHomePage';
import { AmazonSearchResultsPage } from '../pages/AmazonSearchResultsPage';
import { AmazonProductPage } from '../pages/AmazonProductPage';
import logger from '../utils/logger';

test.describe('Amazon iPhone search', () => {
  test.beforeEach(({ page }) => {
    logger.info('=== Test Started ===');
  });

  test.afterEach(({ page }, testInfo) => {
    logger.info(`Test Status: ${testInfo.status}`);
    logger.info('=== Test Completed ===\n');
  });

  test('search for iPhone 17 Pro Max and validate features', async ({ page }) => {
    const home = new AmazonHomePage(page);
    await home.goto();

    // perform search
    await home.search('iPhone 17 Pro Max');

    const results = new AmazonSearchResultsPage(page);
    await results.clickFirstResult();

    const product = new AmazonProductPage(page);
    const title = (await product.getTitle()) || '';
    
    // Validate title
    expect(title.toLowerCase()).toContain('iphone 17 pro max');
    logger.info(`✓ Product title validation passed: ${title}`);

    const features = await product.getFeatures();
    // Validate features
    expect(features.some(f => /storage/i.test(f))).toBeTruthy();
    expect(features.some(f => /color/i.test(f))).toBeTruthy();
    expect(features.length).toBeGreaterThan(0);
    logger.info(`✓ Product features validation passed. Found ${features.length} features`);

    const price = await product.getPrice();
    expect(price).toMatch(/\d+/);
    logger.info(`✓ Product price validation passed: ${price}`);
  });
});