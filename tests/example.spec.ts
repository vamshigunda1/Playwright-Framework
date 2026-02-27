import { test, expect } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage';

test.describe('Example Site', () => {
  test('should load homepage and display title', async ({ page }) => {
    const example = new ExamplePage(page);
    await example.goto();
    await expect(page).toHaveTitle(/Example Domain/);
  });
});