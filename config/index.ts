import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Environment
  env: process.env.ENV || 'test',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',

  // Timeout settings
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  navigationTimeout: parseInt(process.env.NAV_TIMEOUT || '30000'),

  // Retry settings
  retries: parseInt(process.env.RETRIES || '2'),
  retryOnNetworkFailure: process.env.RETRY_ON_NETWORK !== 'false',

  // Browser settings
  headless: process.env.HEADLESS !== 'false',
  slowMo: parseInt(process.env.SLOWMO || '0'),
  viewport: {
    width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
    height: parseInt(process.env.VIEWPORT_HEIGHT || '720')
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  logDir: process.env.LOG_DIR || 'logs',

  // Reporting
  reportDir: process.env.REPORT_DIR || 'playwright-report',
  enableAllure: process.env.ENABLE_ALLURE === 'true',
  allureDir: process.env.ALLURE_DIR || 'allure-results',

  // Trace settings
  trace: process.env.TRACE || 'on-first-retry',
  screenshot: process.env.SCREENSHOT || 'only-on-failure',
  video: process.env.VIDEO || 'retain-on-failure'
};

export default config;
