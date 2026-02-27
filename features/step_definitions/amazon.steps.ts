import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { AmazonHomePage } from '../../pages/AmazonHomePage';
import { AmazonSearchResultsPage } from '../../pages/AmazonSearchResultsPage';
import { AmazonProductPage } from '../../pages/AmazonProductPage';
import logger from '../../utils/logger';

let browser: Browser;
let page: Page;
let home: AmazonHomePage;
let results: AmazonSearchResultsPage;
let product: AmazonProductPage;

Before(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  page = await browser.newPage();
  home = new AmazonHomePage(page);
  results = new AmazonSearchResultsPage(page);
  product = new AmazonProductPage(page);
  logger.info('Browser launched for scenario');
});

After(async function () {
  await page.close();
  await browser.close();
  logger.info('Browser closed after scenario');
});

Given('I am on the Amazon homepage', async function () {
  await home.goto();
});

When('I search for {string}', async function (query: string) {
  await home.search(query);
});

When('I open the first result', async function () {
  await results.clickFirstResult();
});

Then('the product title should contain {string}', async function (text: string) {
  const title = (await product.getTitle()) || '';
  if (!title.toLowerCase().includes(text.toLowerCase())) {
    throw new Error(`Title did not contain ${text}`);
  }
});

Then('the product should list storage and color features', async function () {
  const features = await product.getFeatures();
  const hasStorage = features.some(f => /storage/i.test(f));
  const hasColor = features.some(f => /color/i.test(f));
  if (!hasStorage || !hasColor) {
    throw new Error('Required features missing');
  }
});

Then('the product should have a price', async function () {
  const price = await product.getPrice();
  if (!price || !/\d+/.test(price)) {
    throw new Error('Price not found');
  }
});