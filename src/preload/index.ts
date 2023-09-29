import {
  CHECK_UPDATE,
  CONFIRM_DOWNLOAD,
  CONFIRM_UPDATE,
  VERSION_UPDATE_MESSAGE,
} from '@/common/channel-types';
import type { IUpdateType } from '@/common/types';
import { contextBridge, ipcRenderer } from 'electron';

const apiKey = 'electronAPI';

const api: any = {
  versions: process.versions,
  checkUpdate: async () => {
    await ipcRenderer.invoke(CHECK_UPDATE);
  },
  confirmDownload: async () => {
    await ipcRenderer.invoke(CONFIRM_DOWNLOAD);
  },
  confirmUpdate: async () => {
    await ipcRenderer.invoke(CONFIRM_UPDATE);
  },
  watchVersionUpdateMsg: (callback: (arg: IUpdateType) => void) => {
    ipcRenderer.on(VERSION_UPDATE_MESSAGE, (event, arg: IUpdateType) => {
      callback(arg);
    });
  },
};

contextBridge.exposeInMainWorld(apiKey, api);
