/* eslint-disable no-param-reassign */
import { ValidationError } from "joi";

import { stateKeys } from "config/variables";
import { ValidateRequestMiddleware } from "types";
import { addToValidatedRequestState } from "utils/context";
import { UnprocessableEntityError } from "config/errors/error.types";

const validateRequest: ValidateRequestMiddleware = (origin) => (
  schema
) => async (context, next) => {
  try {
    const toValidate = (origin === "params"
      ? context[origin]
      : context.request[origin]) as Record<string, number | string | boolean>;

    await schema.validateAsync(toValidate);

    context.state[stateKeys.validatedRequest] = addToValidatedRequestState(
      context,
      toValidate
    );
  } catch (error) {
    const validationError = new UnprocessableEntityError(
      (error as ValidationError).details[0].message
    );

    context.throw(validationError);
  }

  await next();
};

export const validateBodyRequest = validateRequest("body");

export const validateQueryRequest = validateRequest("query");

// eslint-disable-next-line unicorn/prevent-abbreviations
export const validateParamsRequest = validateRequest("params");
