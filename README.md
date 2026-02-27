# Playwright Automation Framework - Enterprise Edition

This is an **enterprise-grade** Playwright test automation framework written in **TypeScript** with industry best practices. It includes logging, advanced retry logic, comprehensive reporting, and configuration management out-of-the-box.

## Features

✅ **TypeScript** - Strong typing and excellent IDE support  
✅ **Auto-Retry Logic** - Exponential backoff for flaky tests  
✅ **Structured Logging** - Winston-based logging with file and console output  
✅ **Advanced Reporting** - HTML reports + optional Allure reporting  
✅ **Configurable** - Environment-based configuration via `.env`  
✅ **Page Object Model** - Maintainable and scalable architecture  
✅ **BasePage Class** - Common reusable methods with retry logic  
✅ **Multi-Browser** - Chromium, Firefox, WebKit support  
✅ **Screenshots & Videos** - Automatic capture on failure  
✅ **Trace Debugging** - Built-in trace collection for debugging  

## Getting Started

### Prerequisites
- Node.js (>=18)
- npm or yarn

### Installation

```bash
npm install
npx playwright install
```

### Configuration

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

Key environment variables:

```
BASE_URL=https://www.amazon.in          # Target URL
RETRIES=2                                # Number of retries per test
TIMEOUT=30000                            # Test timeout in ms
HEADLESS=true                            # Run in headless mode
LOG_LEVEL=info                           # Logging level
ENABLE_ALLURE=false                      # Enable Allure reporting
```

### Running Tests

```bash
npm test                  # Run all tests (headless)
npm run test:headed       # Run with visible browser
npm run test:debug        # Interactive debug mode
npm run codegen           # Playwright code generation tool
```

### BDD with Cucumber

The framework supports Gherkin-style tests using Cucumber. Feature files go in the `features/` directory with step definitions under `features/step_definitions`.

Install dependencies:
```bash
npm install -D @cucumber/cucumber cucumber-tsflow
```

Run BDD scenarios:
```bash
npm run bdd                # executes cucumber-js
# or directly:
npx cucumber-js
```

An example feature (`features/amazon_search.feature`) and steps are already included.

### Viewing Reports

```bash
# HTML Report
npx playwright show-report

# Allure Report (if enabled)
npx allure serve allure-results
```

## Project Structure

```
playwright-framework/
├── tests/               # Test files (.spec.ts)
├── pages/               # Page Object Models
├── utils/               # Utilities (Logger, BasePage, Formatters)
├── config/              # Configuration management
├── logs/                # Log files (generated)
├── playwright-report/   # HTML reports (generated)
├── allure-results/      # Allure reports (generated)
├── .env                 # Environment variables
├── .env.example         # Environment template
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Key Components

### BasePage Class
Provides common methods with **built-in retry logic**:
- `goto(url)` - Navigate with retries
- `fillInput(selector, text)` - Fill fields with retries
- `clickElement(selector)` - Click with retries
- `getTextContent(selector)` - Get text with retries
- `waitForElement(selector)` - Wait for element with retries
- `assertElementVisible(selector)` - Assert visibility
- `assertTextContains(selector, text)` - Assert text contains

### Logger
Winston-based logging with:
- **Console output** - Color-coded logs
- **File output** - Separate error.log and combined.log
- **Configurable level** - Via `LOG_LEVEL` env var
- **Automatic timestamps** - ISO format with readability

### Example Test

```typescript
test('search for iPhone 17 Pro Max and validate features', async ({ page }) => {
  const home = new AmazonHomePage(page);
  await home.goto();
  
  await home.search('iPhone 17 Pro Max');
  
  const results = new AmazonSearchResultsPage(page);
  await results.clickFirstResult();
  
  const product = new AmazonProductPage(page);
  const title = await product.getTitle();
  expect(title?.toLowerCase()).toContain('iphone 17 pro max');
});
```

## Logging Output

Logs are automatically written to `logs/` directory:

```
logs/
├── combined.log   # All logs
└── error.log      # Errors only
```

Console output shows color-coded levels: `info`, `warn`, `error`, `debug`.

## Advanced Configuration
### BDD with Cucumber

The framework supports Gherkin-style tests using Cucumber. Feature files go in the `features/` directory and step definitions live under `features/step_definitions`.

Install the dependencies:
```bash
npm install -D @cucumber/cucumber cucumber-tsflow
```

Run BDD scenarios with:
```bash
npm run bdd                # uses cucumber.js defined in package.json
# or directly:
npx cucumber-js
```

Example feature: `features/amazon_search.feature`
```gherkin
Feature: Amazon search
  Scenario: Search for iPhone 17 Pro Max
    Given I am on the Amazon homepage
    When I search for "iPhone 17 Pro Max"
    Then the product title should contain "iPhone 17 Pro Max"
```

Steps are implemented in TypeScript and can reuse existing page objects:

```ts
// features/step_definitions/amazon.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
// .... (see file above) ...
```

The `cucumber.js` config automatically loads `ts-node` so you can write steps in TS.

Playwright’s normal runner is unaffected – use `npm test` for non-BDD specs.


### Retry Strategy
Tests automatically retry on failure (configurable via `RETRIES` env var). Each action in BasePage also implements retry logic with exponential backoff.

### Browser Configuration
Edit `playwright.config.ts` to customize:
- Viewport size
- Timeout values
- Device emulation
- Network simulation

### Screenshots & Videos
Automatically captured based on `.env`:
- `SCREENSHOT=only-on-failure` - Screenshot on failed tests
- `VIDEO=retain-on-failure` - Record video on failure

### Tracing
Enabled via `TRACE` env var:
- `on-first-retry` - Trace only first retry
- `on` - Always trace
- `off` - No tracing

## CI/CD Integration

GitHub Actions workflow in `.github/workflows/playwright.yml`:
- Auto-installs Node, Playwright, and browsers
- Runs tests in parallel
- Uploads HTML reports as artifacts
- Optionally emails the report using SMTP settings from `.env` via the `utils/email.ts` helper

## Best Practices

1. **Extend BasePage** - All page objects should extend `BasePage` for consistency
2. **Use Logger** - Log important actions and assertions
3. **Meaningful Assertions** - Log validation results for debugging
4. **Modular Tests** - Keep tests focused and modular
5. **Environment Config** - Use `.env` for environment-specific settings
6. **Retry Wisely** - Use built-in retry logic; avoid manual waits
7. **Email Reports** - Configure SMTP and send post-run notifications

## Troubleshooting

### Tests hang or timeout
- Check `BASE_URL` in `.env`
- Verify network connectivity
- Increase `TIMEOUT` if needed
- Use `npm run test:headed` to see what's happening

### Logs not appearing
- Check `LOG_DIR` path in `.env`
- Verify write permissions
- Check `LOG_LEVEL` is not set to 'error'

### Reports not generated
- Ensure `REPORT_DIR` path is writable
- Check `playwright.config.ts` for reporter config
- Run `npx playwright show-report` to view

## Future Enhancements

- [ ] Test data management (fixtures, factories)
- [ ] Custom reporters (Slack, Teams notifications)
- [ ] Visual regression testing
- [ ] Performance monitoring
- [ ] Parallel execution metrics

## License

MIT
