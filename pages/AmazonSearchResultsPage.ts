import { Page } from '@playwright/test';
import BasePage from '../utils/BasePage';
import logger from '../utils/logger';

export class AmazonSearchResultsPage extends BasePage {
  readonly resultItems = 'div.s-main-slot > div[data-component-type="s-search-result"]';

  constructor(page: Page) {
    super(page);
  }

  async clickFirstResult(): Promise<void> {
    logger.info('Clicking first search result');
    await this.waitForElement(this.resultItems);
    const first = (await this.page.$$(this.resultItems))[0];
    await first.click();
    logger.info('Successfully clicked first result');
  }
}