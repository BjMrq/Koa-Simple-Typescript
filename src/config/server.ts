import cors from "@koa/cors";
import Koa, { DefaultState } from "koa";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import helmet from "koa-helmet";

import log from "globalMiddlewares/log";
import error from "globalMiddlewares/error";
import { errorEvent, errorHandler } from "config/errors/error.event";
import corsOptions from "config/cors";
import registerRouters from "api";
import { ContextWithGlobalMiddleware, StatefulKoa } from "types";

const configServer = (): StatefulKoa => {
  /**
   * Create app
   */
  const app = new Koa<DefaultState, ContextWithGlobalMiddleware>();

  /**
   * Register global middlewares
   */

  app
    // Provides security headers
    .use(helmet())
    // Configure cors
    .use(cors(corsOptions))
    // Parse the body request
    .use(bodyParser())
    // Log every logRequests
    .use(log)
    // Handle trowed errors
    .use(error)
    // Allow compress
    .use(compress());

  /**
   * Register events
   */
  app.on(errorEvent, errorHandler);

  /**
   * Apply global router
   */
  registerRouters(app);

  return app;
};

export default configServer;
