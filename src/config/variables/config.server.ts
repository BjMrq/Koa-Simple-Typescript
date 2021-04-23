import joi from "joi";

import { ConfigError } from "config/errors/error.types";

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const environmentSchema = joi
  .object({
    NODE_ENV: joi.string().allow("development", "production", "test"),

    ROOT_URL: joi.string(),
    CLIENT_URL: joi.string(),
    PORT: joi.number(),
    API_VERSION: joi.number(),
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

export const appName = environmentVariables.APP_NAME as string;
export const clientUrl =
  (environmentVariables.CLIENT_URL as string) || "http://localhost";
export const environment = environmentVariables.NODE_ENV as string;
export const isTest = environmentVariables.NODE_ENV === "test";
export const isDevelopment = environmentVariables.NODE_ENV === "development";
export const isProduction = environmentVariables.NODE_ENV === "production";
export const rootUrl =
  (environmentVariables.ROOT_URL as string) || "http://localhost";
export const port = (environmentVariables.PORT as number) || 3000;
export const apiVersion = `v${environmentVariables.API_VERSION}` || "v1";
