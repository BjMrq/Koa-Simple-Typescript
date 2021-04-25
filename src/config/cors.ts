import { Options } from "@koa/cors";

import { clientUrl } from "./variables";

export const corsOptions: Options = {
  origin: clientUrl,
  credentials: true,
};
