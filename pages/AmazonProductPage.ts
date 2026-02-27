import { Page } from '@playwright/test';
import BasePage from '../utils/BasePage';
import logger from '../utils/logger';

export class AmazonProductPage extends BasePage {
  readonly titleSelector = '#productTitle';
  readonly featuresSelector = '#feature-bullets';
  readonly priceSelector = '#priceblock_ourprice, #priceblock_dealprice';

  constructor(page: Page) {
    super(page);
  }

  async getTitle(): Promise<string | null> {
    logger.info('Retrieving product title');
    return this.getTextContent(this.titleSelector);
  }

  async getFeatures(): Promise<string[]> {
    logger.info('Retrieving product features');
    const content = await this.getTextContent(this.featuresSelector);
    return content ? content.split('\n').map((f: string) => f.trim()).filter(Boolean) : [];
  }

  async getPrice(): Promise<string | null> {
    logger.info('Retrieving product price');
    return this.getTextContent(this.priceSelector);
  }
}