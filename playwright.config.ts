import { defineConfig, devices } from '@playwright/test';
import config from './config/index';

export default defineConfig({
  testDir: './tests',
  timeout: config.timeout,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: config.retries,
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: config.reportDir
      }
    ],
    ...(config.enableAllure
      ? [
          [
            'allure-playwright',
            {
              outputFolder: config.allureDir
            }
          ]
        ]
      : [])
  ],
  use: {
    headless: config.headless,
    viewport: config.viewport,
    actionTimeout: 0,
    baseURL: config.baseUrl,
    trace: config.trace as 'on' | 'off' | 'on-first-retry' | 'retain-on-failure',
    screenshot: config.screenshot as 'on' | 'off' | 'only-on-failure',
    video: config.video as 'on' | 'off' | 'retain-on-failure',
    slowMo: config.slowMo
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});