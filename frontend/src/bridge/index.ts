import { BrowserView, BrowserWindow, ipcMain, session } from 'electron';
import chalk from 'chalk';
import puppeteer, { Browser } from 'puppeteer';
import { IPCChannels } from '../types';
import * as pie from '../packages/electron-puppeteer';
import locateChrome from 'locate-chrome';
import log from 'electron-log';
import UserAgent from 'user-agents';

const getPageUrl = (page: any) => {
  const urls = [
    {
      key: 'notifications',
      url: 'https://onlyfans.com/my/notifications',
    },
    {
      key: 'messages',
      url: 'https://onlyfans.com/my/chats/',
    },
    {
      key: 'collections',
      url: 'https://onlyfans.com/my/collections/user-lists/recent',
    },
    {
      key: 'vault',
      url: 'https://onlyfans.com/my/vault/list/all',
    },
    {
      key: 'queue',
      url: 'https://onlyfans.com/my/queue',
    },
    {
      key: 'statements',
      url: 'https://onlyfans.com/my/statements/earnings',
    },
    {
      key: 'statistics',
      url: 'https://onlyfans.com/my/statistics/statements/earnings',
    },
    {
      key: 'myprofile',
      url: 'https://onlyfans.com/',
    },
    {
      key: 'newpost',
      url: 'https://onlyfans.com/posts/create',
    },
  ];

  for (const item of urls) {
    if (item.key === page) {
      return item.url;
    }
  }
};

const startIPCBridge = ({
  mainWindow,
  ofBrowser,
}: {
  mainWindow: BrowserWindow;
  ofBrowser: Browser;
}) => {
  let ofBrowserView: BrowserView | null = null;
  // eslint-disable-next-line no-console
  console.log(chalk.bgYellow('IPC Bridge Started'));

  const fingerprintUrl = 'https://bot.sannysoft.com/';
  // https://antoinevastel.com/bots/

  ipcMain.on('launch-anty-browser', async (e, arg) => {
    try {
      const proxyConfig = {
        address: 'geo.iproyal.com',
        port: 12321,
        credentials: {
          username: 'ryb6AD',
          password: 'ryb6AD',
        },
      };

      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        ignoreDefaultArgs: ['--enable-automation'],
        args: [
          '--start-maximized',
          '--disable-blink-features=AutomationControlled',
          // `--proxy-server=${proxyConfig.address}:${proxyConfig.port}`,
        ],
        executablePath: await locateChrome(),
      });

      const ua = new UserAgent({
        deviceCategory: 'desktop',
      });

      browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
          const randomizedUserAgent = ua.random();
          const newPage = await target.page();
          await Promise.all([
            await page.setJavaScriptEnabled(false),
            // Set the geolocation for the new page
            await newPage?.setGeolocation({
              latitude: 59.95,
              longitude: 30.31667,
            }),
            await newPage?.setUserAgent(randomizedUserAgent.data.userAgent),
            await page.evaluateOnNewDocument(() => {
              if (navigator.webdriver) {
                delete Object.getPrototypeOf(navigator).webdriver;
              }
            }),
          ]);
        }
      });

      const page = await browser.newPage();

      page.setDefaultNavigationTimeout(60000);
      // await page.authenticate({
      //   username: proxyConfig.credentials.username,
      //   password: proxyConfig.credentials.password,
      // });
      await page.goto('https://bot.sannysoft.com/');
    } catch (err) {
      log.error(err);
    }
  });

  ipcMain.on('attempt-login' as IPCChannels, async (e, arg) => {
    try {
      console.log(arg);
      ofBrowserView = new BrowserView({
        webPreferences: {
          partition: 'persist:' + arg.creatorId,
        },
      });

      const proxyURL = `${arg.proxy.hostname}:${arg.proxy.port}`;

      mainWindow.addBrowserView(ofBrowserView);
      /* ofBrowserView.setBounds({
        x: -999999,
        y: -999999, 
        width: 894,
        height: 789
      }) */
      ofBrowserView.setBounds(arg.bounds);

      const [_, partitionCookies, page] = await Promise.all([
        session.fromPartition('persist:' + arg.creatorId).setProxy({
          proxyRules: proxyURL,
        }),
        session
          .fromPartition('persist:' + arg.creatorId)
          .cookies.get({ name: 'auth_id' }),
        pie.getPage(ofBrowser, ofBrowserView),
      ]);

      const isLogged = partitionCookies.length;

      isLogged && ofBrowserView?.setBounds(arg.bounds);

      await page.authenticate({
        username: arg.proxy.username,
        password: arg.proxy.password,
      });

      // ofBrowserView?.setBounds(arg.bounds)
      // return await page.goto('https://iproyal.com/ip-lookup/');

      const pageUrl = getPageUrl(arg.page);
      await page.goto(pageUrl as string);
      await page.waitForNavigation({ waitUntil: 'load' });
      await page.addStyleTag({
        content: `
          header { display: none !important; }
          .v-input__append-outer { display: none !important; }
        `,
      });

      const loginOFAccount = async () => {
        console.log('Need to login');

        await Promise.all([
          page.waitForSelector('input[at-attr="input"][name="email"]', {
            timeout: 5000,
          }),
          page.waitForSelector('input[at-attr="input"][name="password"]', {
            timeout: 5000,
          }),
          page.waitForSelector('button[at-attr="submit"][type="submit"]', {
            timeout: 5000,
          }),
        ]);

        await page.type('input[at-attr="input"][name="email"]', arg.email);
        await page.type(
          'input[at-attr="input"][name="password"]',
          arg.password
        );
        await page.click('button[at-attr="submit"][type="submit"]');

        // Check if the captcha element is present
        await page.waitForSelector('iframe[title="reCAPTCHA"]', {
          timeout: 10000,
        });

        const captcha = await page.$('iframe[title="reCAPTCHA"]');

        if (captcha) {
          console.log('Captcha is there', captcha);
        } else {
          await page.waitForSelector('input[at-attr="input"][name="email"]', {
            timeout: 5000,
          }),
            console.log('Captcha is not there');
        }
      };

      if (!partitionCookies.length) {
        ofBrowserView?.setBounds(arg.bounds);
        await loginOFAccount();
        return;
      }

      console.log('Already logged in');
    } catch (err) {
      console.log(err);
    }
  });

  ipcMain.on('remove-browser-view', () => {
    if (ofBrowserView) {
      mainWindow.removeBrowserView(ofBrowserView);
      ofBrowserView = null;
    }
  });
};

export default startIPCBridge;
