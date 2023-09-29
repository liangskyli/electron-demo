import type { ProgressInfo } from 'builder-util-runtime/out/ProgressCallbackTransform';

export type IUpdateType =
  | {
      /**
       * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
       **/
      state: -1 | 0 | 1 | 2 | 4;
      message: string;
    }
  | {
      /**
       * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
       **/
      state: 3;
      message: ProgressInfo;
    };
