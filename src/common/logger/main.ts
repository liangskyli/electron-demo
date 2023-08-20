import { archiveLogFn } from '@/common/logger/common';
import type { App } from 'electron';
import type { LogMessage, PathVariables } from 'electron-log';
import logger from 'electron-log/main';
import path from 'path';

const mainLogger = (app: App) => {
  logger.initialize({ preload: true });
  Object.assign(console, logger.functions);

  logger.catchErrors({});
  logger.transports.console.level = false;
  logger.transports.file.maxSize = 1024 * 1024 * 2;
  logger.transports.file.archiveLogFn = archiveLogFn;
  logger.variables.version = '0.0.1'; // todo
  logger.transports.file.resolvePathFn = (
    variables: PathVariables,
    message?: LogMessage,
  ) => {
    const isRenderer = message?.variables?.processType === 'renderer';
    const fileName = isRenderer ? 'renderer.log' : 'main.log';
    return path.join(variables.libraryDefaultDir, fileName);
  };
  logger.transports.file.format =
    '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [v{version}] [{processType}] [{level}]{scope} {text}';

  app.on('ready', () => {
    console.info(
      'app ready,platform:',
      `${process.platform}@${process.getSystemVersion()}`,
      'process.versions:',
      process.versions,
    );
  });
  return logger;
};

export { mainLogger };
