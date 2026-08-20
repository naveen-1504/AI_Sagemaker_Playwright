import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

setDefaultTimeout(60000);

Before({ tags: '@api' }, async function () {
  apiContext = await request.newContext();
  this.page = { request: apiContext };
});

After({ tags: '@api' }, async function () {
  await apiContext.dispose();
});
