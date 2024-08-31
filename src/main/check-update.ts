import {
  CHECK_UPDATE,
  CONFIRM_DOWNLOAD,
  CONFIRM_UPDATE,
  VERSION_UPDATE_MESSAGE,
} from '@/common/channel-types';
import type { IUpdateType } from '@/common/types';
import type { BrowserWindow } from 'electron';
import { app, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'node:path';

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  Object.defineProperty(app, 'isPackaged', {
    get() {
      return true;
    },
  });
}

function autoUpdaterMessage(
  mainWindow: BrowserWindow,
  type: IUpdateType['state'],
  data?: IUpdateType['message'],
) {
  const sendData = {
    state: type,
    message: data || '',
  };
  mainWindow.webContents.send(VERSION_UPDATE_MESSAGE, sendData);
  console.log('autoUpdaterMessage:', sendData);
}

const checkUpdate = (mainWindow: BrowserWindow) => {
  autoUpdater.autoDownload = false;
  if (isDevelopment) {
    autoUpdater.updateConfigPath = path.join(
      __dirname,
      '../../main/dev-app-update.yml',
    );
  }
  autoUpdater.on('error', (err) => {
    console.log('autoUpdater error:', err);
    autoUpdaterMessage(mainWindow, -1, err.message);
  });
  autoUpdater.on('checking-for-update', () => {
    autoUpdaterMessage(mainWindow, 0);
  });
  autoUpdater.on('update-available', (info) => {
    autoUpdaterMessage(mainWindow, 1, info.version);
  });
  autoUpdater.on('update-not-available', (info) => {
    autoUpdaterMessage(mainWindow, 2, info.version);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    autoUpdaterMessage(mainWindow, 3, progressObj);
  });
  autoUpdater.on('update-downloaded', ({ version }) => {
    autoUpdaterMessage(mainWindow, 4, version);
  });
  ipcMain.handle(CHECK_UPDATE, () => {
    autoUpdater
      .checkForUpdates()
      .then((value) => {
        console.log(`${CHECK_UPDATE} success:`, value);
      })
      .catch((err) => {
        console.log(`${CHECK_UPDATE} error:`, err);
      });
  });
  ipcMain.handle(CONFIRM_UPDATE, () => {
    console.log(CONFIRM_UPDATE);
    autoUpdater.quitAndInstall();
    // https://github.com/electron-userland/electron-builder/issues/6058
    /*setTimeout(() => {
      autoUpdater.quitAndInstall();
      app.exit();
    }, 10000);*/
  });

  ipcMain.handle(CONFIRM_DOWNLOAD, async () => {
    console.log(CONFIRM_DOWNLOAD);
    await autoUpdater.downloadUpdate();
  });
};
export default checkUpdate;
