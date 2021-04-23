import { Options } from "@koa/cors";

import { clientUrl } from "./variables";

const corsOptions: Options = {
  origin: clientUrl,
  credentials: true,
};

export default corsOptions;
