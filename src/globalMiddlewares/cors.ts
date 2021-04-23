import cors from "@koa/cors";

import { clientUrl } from "config/variables";

export default cors({
  origin: clientUrl,
  credentials: true,
});
