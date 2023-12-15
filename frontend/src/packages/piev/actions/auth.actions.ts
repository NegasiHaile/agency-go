import { Page } from 'puppeteer-core';
import { injectOfStyles } from '../inject-styles';

export async function checkAuth(page: Page): Promise<boolean> {
  await page.waitForNavigation({ waitUntil: 'load' });
  const url = page.url();
  const emailInputSelector = 'input[at-attr="input"][name="email"]';
  const emailInput = await page.$(emailInputSelector);
  return !emailInput;
}

export async function auth(page: Page, creds: { email: string; password: string; }): Promise<void> {
  const authed = await checkAuth(page);
  if (authed) return;
  const emailInputSelector = 'input[at-attr="input"][name="email"]';
  const passwordInputSelector = 'input[at-attr="input"][name="password"]';
  const loginButtonSelector = 'button[at-attr="submit"][type="submit"]';

  await page.waitForSelector(emailInputSelector);
  await page.type(emailInputSelector, creds.email)

  await page.waitForSelector(passwordInputSelector);
  await page.type(passwordInputSelector, creds.password);

  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);
  await injectOfStyles(page);
  await page.waitForNavigation();
} 