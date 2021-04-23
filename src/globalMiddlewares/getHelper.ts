/* eslint-disable no-param-reassign */

import { stateKeys } from "config/variables";
import { WithHelperMiddleware, StatefulContext } from "types";
import { addToHelperState } from "utils/context";

/**
 * Helper middleware wrapper that receive a function that will return data to be added to the helpers state in the context
 * @param {(context: Context) => Record<string, any>} sendResponse - a function that return
 * an object with any data to be added to the helpers key of context
 */
const getHelper: WithHelperMiddleware = (
  getHelperFunction: (
    context: StatefulContext<any>
  ) => Promise<Record<string, unknown>> | Record<string, unknown>
) => async (context, next) => {
  try {
    const helpers = await getHelperFunction(context);

    context.state[stateKeys.helpers] = addToHelperState(context, helpers);
  } catch (error) {
    context.throw(error);
  }

  await next();
};

export default getHelper;
