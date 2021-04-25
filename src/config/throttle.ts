import { RateLimitOptions } from "koa2-ratelimit";

import logger from "./logger";
import { isDevelopment } from "./variables";

export const throttleOptions = {
  interval: { min: 1 },
  max: isDevelopment ? 0 : 120,
  headers: true,
  // eslint-disable-next-line @typescript-eslint/require-await, require-await
  getUserId: async (context) => context.get("X-Forwarded-For") || context.ip,

  onLimitReached: (context) => {
    logger.warning("Suspicious Ip has reached max requests:", context.ip);
  },
} as RateLimitOptions;
