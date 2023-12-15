import { Page } from 'puppeteer-core';
import { auth, checkAuth } from "./auth.actions";
import { injectOfStyles } from '../inject-styles';

export async function acceptCookies(page: Page) {

}

export async function navigate(page: Page, url: string, creds: { email: string; password: string; }): Promise<void> {
  await page.goto(url);
  await injectOfStyles(page);
  await auth(page, creds);
}