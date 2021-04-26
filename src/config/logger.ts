import winston from "winston";
import Sentry from "winston-sentry-log";

import { isDevelopment, sentryDNS, sentryEnvironment } from "./variables";

// Base logger
const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.json()
  ),
});

// Log to the console
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.prettyPrint(),
      winston.format.json(),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(
        ({ timestamp, level, message }) =>
          `[${timestamp}] ${level} - ${JSON.stringify(
            message || '""',
            undefined,
            2
          )}`
      )
    ),

    level: "debug",
  })
);

if (!isDevelopment) {
  // Send errors to Sentry
  logger.add(
    new Sentry({
      config: {
        dsn: sentryDNS,
        environment: sentryEnvironment,
      },

      name: "sentry",
      level: "error",
    })
  );
}

export default logger;
