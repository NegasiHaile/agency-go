import { Page } from "puppeteer-core";

export async function injectOfStyles(page: Page) {
  await page.addStyleTag({
    content: `
      .container { margin: 0px !important; max-width: 100% !important; }
      #main { margin: 0px !important; }
      .l-header { display: none !important; }
    `
  });
}