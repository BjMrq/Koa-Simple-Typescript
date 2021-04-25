import { GuardMiddleware, StatefulContext } from "types";

/**
 * Helper middleware wrapper that receive a function that will return a boolean value and an error if the boolean value if meet the flow will continue, if not it will return the given error
 * @param {(context: Context) => {condition: boolean, errorIfConditionNotMet: Error}} sendResponse - a function that return
 * an object with the value to evaluate and the error to trigger if it is not
 */
const guardIf: GuardMiddleware = (
  guardFunction: (
    context: StatefulContext<any>
  ) => Promise<Record<string, unknown>> | Record<string, unknown>
) => async (context, next) => {
  try {
    const guard = await guardFunction(context);

    if (guard.condition) {
      await next();
    } else {
      throw guard.errorIfConditionNotMet;
    }
  } catch (error) {
    context.throw(error);
  }
};

export default guardIf;
