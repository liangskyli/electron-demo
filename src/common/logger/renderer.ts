import logger from 'electron-log/renderer';

const renderLogger = () => {
  Object.assign(console, logger.functions);
  return logger;
};

export { renderLogger };
