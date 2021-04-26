import { Context } from "koa";

import logger from "config/logger";

const errorEvent = "error";

const errorHandler = (error: Error, context: Context): void => {
  // Every error are logged
  logger.error({
    method: context.method,
    path: context.path,

    error: {
      name: error.name,
      stack: error.stack,
    },
  });
};

export { errorHandler, errorEvent };
