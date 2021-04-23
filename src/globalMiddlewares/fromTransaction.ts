/* eslint-disable no-param-reassign */
import { stateKeys } from "config/variables";
import { StatefulContext, WithTransactionMiddleware } from "types";

import { addToTransactionState } from "../utils/context";

/**
 * Records middleware wrapper that receive a function that will return data to be added to the records state in the context
 * @param {(context: Context) => Record<string, any>} sendResponse - a function that return
 * an object with any data to be added to the records key of context
 */
const fromTransaction: WithTransactionMiddleware = (
  fromTransactionFunction: (
    context: StatefulContext<any>
  ) => Promise<Record<string, unknown>> | Record<string, unknown>
) => async (context, next) => {
  try {
    const newRecords = await fromTransactionFunction(context);

    context.state[stateKeys.transactions] = addToTransactionState(
      context,
      newRecords
    );
  } catch (error) {
    context.throw(error);
  }

  await next();
};

export default fromTransaction;
