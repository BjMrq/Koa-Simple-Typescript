// eslint-disable-next-line import/no-unassigned-import, putout/putout
import "app-module-path/register";
import connectDB from "config/database";
import logger from "config/logger";
import configServer from "config/server";
import { appName, port, isProduction } from "config/variables";

const bootstrap = (): void => {
  /**
   * Connect database
   * It's important that the database is initialized first
   * to bind the Objection's model to the knex instance
   */
  connectDB();

  /**
   * Configure the server and it's routes
   */
  const server = configServer();

  /**
   * Start the app
   */
  server.listen(port);
};

// Start the bootstrap process
(() => {
  try {
    bootstrap();

    logger.info(`🛩  ${appName} is listening on port ${port}, let's play!`);
  } catch (error) {
    setImmediate(() => {
      logger.error("Unable to run the server because of the following error:");
      logger.error((error as Error).message);

      if (isProduction) {
        process.exit();
      }
    });
  }
})();
