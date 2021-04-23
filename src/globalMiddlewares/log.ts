import { Context, Next } from "koa";

import logger from "config/logger";
import { getFullDate } from "utils";

const log = async (context: Context, next: Next): Promise<void> => {
  logger.info(
    `${getFullDate()} | ${context.method} | ${context.path} | ${JSON.stringify(
      context.request.body,
      undefined,
      2
    )} |`
  );

  await next();
};

export default log;
