import joi from "joi";
import { Secret } from "jsonwebtoken";

import { ConfigError } from "config/errors/error.types";

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const environmentSchema = joi
  .object({
    JWT_SECRET: joi.string().required(),

    SENTRY_DNS: joi.string().uri().allow("").required(),

    SENTRY_ENVIRONMENT: joi.string().allow("").optional(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: environmentVariables } = environmentSchema.validate(
  process.env
) as { error: Error; value: Record<string, string | number> };

if (error) {
  throw new ConfigError(error.message);
}

export const jwtSecret = environmentVariables.JWT_SECRET as Secret;
export const sentryDNS = environmentVariables.SENTRY_DNS as string;
// eslint-disable-next-line max-len
export const sentryEnvironment = environmentVariables.SENTRY_ENVIRONMENT as string;
