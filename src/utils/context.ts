import * as R from "ramda";

import { stateKeys } from "config/variables";
import { StatefulContext } from "types";

/**
 * Merge given object with the context state on a specific key
 */
const addToState = (
  contextKey: keyof typeof stateKeys,
  context: StatefulContext,
  dataToAddToContext: Record<string, any>
) =>
  ({
    ...context.state[contextKey],
    ...dataToAddToContext,
  } as Record<string, any>);

/**
 * Merge given object with the context state on a helper key
 */
const addToHelperState = R.partial(addToState, [stateKeys.helpers]);

/**
 * Merge given object with the context state on a records key
 */
const addToRecordsState = R.partial(addToState, [stateKeys.records]);

/**
 * Merge given object with the context state on a transactions key
 */
const addToTransactionState = R.partial(addToState, [stateKeys.transactions]);

/**
 * Merge given object with the context state on a validatedRequest key
 */
const addToValidatedRequestState = R.partial(addToState, [
  stateKeys.validatedRequest,
]);

export {
  addToHelperState,
  addToRecordsState,
  addToTransactionState,
  addToValidatedRequestState,
};
