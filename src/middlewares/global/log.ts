import { Context, Next } from "koa";

import logger from "config/logger";
import { getFullDate } from "utils";

const log = async (context: Context, next: Next): Promise<void> => {
  await next();
  logger.info({
    request: {
      date: getFullDate(),
      method: context.method,
      path: context.path,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: context.request.body,
    },

    response: { status: context.status, body: context.body },
  });
};

export default log;
