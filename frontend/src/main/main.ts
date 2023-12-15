/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins. mutate(null, {
          onSuccess: () => {
            setIsLogin(true);
          },
          onError: () => {
            setIsLogin(false);
          },
        });
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  BrowserView,
  screen,
  ipcMain,
  clipboard,
  session,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import puppeteer, { Browser } from 'puppeteer';
import Store from 'electron-store';
import startIPCBridge from '../bridge';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import * as pie from '../packages/electron-puppeteer';

let mainWindow: BrowserWindow | null = null;
let ofBrowser: Browser | null = null;

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

autoUpdater.on('update-downloaded', () => {
  log.info('update downloaded');
  setImmediate(() => {
    try {
      log.info('installing update');
      // app.relaunch();
      autoUpdater.quitAndInstall();
    } catch (err) {
      log.error('Error installing update');
      log.error(err);
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  const winDimens = screen.getPrimaryDisplay().workAreaSize;
  const store = new Store();
  ipcMain.handle('get-store', (_, key) => {
    return store.get(key);
  });
  ipcMain.handle('remove-store', (_, key) => {
    store.delete(key);
  });

  ipcMain.on('download', (args, key) => {
    console.log('download called from main', key);
    mainWindow?.webContents.downloadURL(key.url);
  });
  ipcMain.on('copy-to-clipboard', (_, key) => {
    clipboard.writeText(key.link, 'selection');

    console.log('clip', clipboard.readText('selection'));
  });

  /*  if (!isDebug) {
    await installExtensions();
  } */

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: true,
    width: winDimens.width,
    height: winDimens.height,
    minWidth: 1281,
    minHeight: 800,
    icon: getAssetPath('icon.png'),
    resizable: true,
    roundedCorners: true,
    frame: true,
  });

  const view1 = new BrowserView({
    webPreferences: {
      webSecurity: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      partition: 'persist:main',
    },
  });

  mainWindow.addBrowserView(view1);

  view1.setBounds({
    x: 0,
    y: 0,
    width: winDimens.width,
    height: winDimens.height,
  });
  await view1.webContents.loadURL(resolveHtmlPath('index.html'));
  view1.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  if (mainWindow && ofBrowser) {
    startIPCBridge({
      mainWindow,
      ofBrowser,
    });
  }
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({
        requestHeaders: { Origin: '*', ...details.requestHeaders },
      });
    }
  );

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          'Access-Control-Allow-Origin': ['*'],
          ...details.responseHeaders,
        },
      });
    }
  );
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const main = async () => {
  try {
    await pie.initialize(app);
    ofBrowser = await pie.connect(app, puppeteer as any);
    await app.whenReady();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  } catch (err) {
    console.error('Eeeefaaaaaa', err);
  }
};
app.on('ready', createWindow);

main();

export default mainWindow;
