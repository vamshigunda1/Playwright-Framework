import { Page } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly url = 'https://example.com';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
}
