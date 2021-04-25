import Router from "koa-router";

import withResponse from "middlewares/wrappers/withResponse";

export const healthSubRouter = (): Router.IMiddleware => {
  const router = new Router({
    prefix: "/health",
  });

  router.get("/", withResponse({ status: 200 }));

  return router.routes();
};
