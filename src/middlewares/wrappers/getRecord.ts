/* eslint-disable no-param-reassign */
import { Next } from "koa";
import * as R from "ramda";

import { NotFoundError } from "config/errors/error.types";
import { stateKeys } from "config/variables";
import { StatefulContext, GetRecordMiddleware } from "types";
import { addToRecordsState } from "utils/context";

/**
 * Records middleware wrapper that receive a function that will return data to be added to the records state in the context
 * @param {(context: Context) => Record<string, any>} sendResponse - a function that return
 * an object with any data to be added to the records key of context
 */
const addRecordToContext = (
  shouldFailIfNotFound: boolean,
  getRecordFunction: (
    context: StatefulContext<any>
  ) => Promise<Record<string, unknown>> | Record<string, unknown>
) => async (context: StatefulContext, next: Next) => {
  try {
    const newRecords = await getRecordFunction(context);

    if (shouldFailIfNotFound) {
      Object.entries(newRecords).forEach(([recordName, recordFromDatabase]) => {
        if (recordFromDatabase === undefined) {
          throw new NotFoundError(recordName);
        }
      });
    }

    context.state[stateKeys.records] = addToRecordsState(context, newRecords);
  } catch (error) {
    context.throw(error);
  }

  await next();
};

/**
 * Records middleware wrapper that receive a function that will return data to be added to the records state in the context
 * It will throw a NotFoundError if of the data ends up being undefined
 * @param {Function} sendResponse - a function that return
 * an object with any data to be added to the records key of context
 */
const getRecordOrFail: GetRecordMiddleware = R.partial(addRecordToContext, [
  true,
]);

/**
 * Records middleware wrapper that receive a function that will return data to be added to the records state in the context
 * It will continue execution even if one of the data ends up being undefined
 * @param {Function} sendResponse - a function that return
 * an object with any data to be added to the records key of context
 */
const getRecord: GetRecordMiddleware = R.partial(addRecordToContext, [false]);

export { getRecordOrFail, getRecord };
