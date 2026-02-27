import { Page } from '@playwright/test';
import BasePage from '../utils/BasePage';
import logger from '../utils/logger';

export class AmazonHomePage extends BasePage {
  readonly searchInput = 'input#twotabsearchtextbox';
  readonly searchButton = 'input#nav-search-submit-button';

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    logger.info('Navigating to Amazon.in');
    await super.goto('https://www.amazon.in');
  }

  async search(query: string): Promise<void> {
    logger.info(`Searching for: ${query}`);
    await this.fillInput(this.searchInput, query);
    await this.clickElement(this.searchButton);
    logger.info('Search completed');
  }
}