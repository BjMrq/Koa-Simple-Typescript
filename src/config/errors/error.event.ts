import { Context } from "koa";

import logger from "config/logger";
import { getFullDate } from "utils";

const errorEvent = "error";

const errorHandler = (error: Error, context: Context): void => {
  // Every error are logged
  logger.error(
    `${getFullDate()} | context:  ${context.method} ${
      context.path
    } ${JSON.stringify(context.request.body, undefined, 2)} | ${error.name} | ${
      error.message
    } | stack: ${error.stack || ""} | `
  );
};

export { errorHandler, errorEvent };
