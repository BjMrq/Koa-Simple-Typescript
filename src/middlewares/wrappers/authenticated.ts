/* eslint-disable no-param-reassign */
import { verify } from "jsonwebtoken";
import { Context, Next } from "koa";

import {
  NotAuthenticatedError,
  NotAuthorizeError,
} from "config/errors/error.types";
import { EncodedAuthData } from "types";
import { jwtSecret, stateKeys } from "config/variables";

const auth = async (context: Context, next: Next): Promise<void> => {
  if (!context.headers.authorization) {
    context.throw(new NotAuthenticatedError());
  }

  const token = context.headers.authorization.split(" ")[1];

  try {
    context.state[stateKeys.jwtPayload] = verify(
      token,
      jwtSecret
    ) as EncodedAuthData;
  } catch {
    context.throw(new NotAuthorizeError());
  }

  await next();
};

export default auth;
