import { NotAuthorizeError } from "config/errors/error.types";

import { AccessMiddleware } from "../types";

const accessValidateIdentity: AccessMiddleware = (keyToCompare) => async (
  context,
  next
) => {
  try {
    const {
      validatedRequest,
      jwtPayload: { userId },
    } = context.state;

    // checks whether the userId in the request matches the userId in the jwtPayload
    if (String(validatedRequest[keyToCompare]) !== String(userId)) {
      throw new NotAuthorizeError();
    }
  } catch (error) {
    context.throw(error);
  }

  await next();
};

/**
 * accessValidateUserId middleware will compare the user id in the sent jwt token with the repId in validatedRequest
 */
export const accessValidateUserId = accessValidateIdentity("userId");

/**
 * accessValidateRepId middleware will compare the user id in the sent jwt token with the userId in validatedRequest
 */
export const accessValidateRepId = accessValidateIdentity("repId");
