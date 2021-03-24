import logger from 'loglevel';

const debug = (...msg: unknown[]): void => logger.debug(msg);
const log = (...msg: unknown[]): void => logger.log(msg);
const info = (...msg: unknown[]): void => logger.info(msg);
const warn = (...msg: unknown[]): void => logger.warn(msg);
const error = (...msg: unknown[]): void => logger.error(msg);

export default {
  debug,
  log,
  info,
  warn,
  error,
};
