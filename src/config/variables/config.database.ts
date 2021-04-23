import joi from "joi";

import { ConfigError } from "config/errors/error.types";

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const environmentSchema = joi
  .object({
    DB_USER: joi.string(),
    DB_HOST: joi.string(),

    DB_PASSWORD: joi.string().optional().empty(""),

    DB_NAME: joi.string(),
    DB_TEST_NAME: joi.string(),
    DB_PORT: joi.number(),
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

export const databaseName = environmentVariables.DB_NAME as string;
export const databaseTestName = environmentVariables.DB_TEST_NAME as string;
export const databaseHost = environmentVariables.DB_HOST as string;
export const databasePort = environmentVariables.DB_PORT as number;
export const databaseUser = environmentVariables.DB_USER as string;
export const databasePassword = environmentVariables.DB_PASSWORD as string;
