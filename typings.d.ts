import type { IUpdateType } from '@/common/types';
import './src/.umi/typings';

declare global {
  interface Window {
    electronAPI: {
      versions: any;
      checkUpdate: () => Promise<void>;
      confirmDownload: () => Promise<void>;
      confirmUpdate: () => Promise<void>;
      watchVersionUpdateMsg: (callback: (arg: IUpdateType) => void) => void;
    };
  }
}
