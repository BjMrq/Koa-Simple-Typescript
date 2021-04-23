import Router from "koa-router";
import Koa, { DefaultState } from "koa";

import { apiVersion } from "config/variables";
import { ContextWithGlobalMiddleware } from "types";

import { healthSubRouter } from "./health/health.routes";

const registerRouters = (
  app: Koa<DefaultState, ContextWithGlobalMiddleware>
): Koa<DefaultState, ContextWithGlobalMiddleware> => {
  const router = new Router({
    prefix: `/api/${apiVersion}`,
  });

  router.use(healthSubRouter());

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};

export default registerRouters;
