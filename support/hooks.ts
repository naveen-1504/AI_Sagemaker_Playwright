import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext, devices } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(180000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  context = await browser.newContext({
    ...devices['Desktop Chrome'],
  });
  page = await context.newPage();
  page.setDefaultTimeout(90000);
  page.setDefaultNavigationTimeout(90000);
  this.page = page;
});

After(async function () {
  await page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
