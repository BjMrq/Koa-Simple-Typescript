import winston from "winston";
import Sentry from "winston-sentry-log";

import {
  isDevelopment,
  sentryDNS,
  sentryEnvironment,
  appName,
} from "./variables";

// Base logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: `service-${appName}` },
});

// Log to the console
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.prettyPrint(),
      winston.format.json()
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
