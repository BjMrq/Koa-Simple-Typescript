/* eslint-disable require-atomic-updates */
/* eslint-disable no-param-reassign */

import { httpResponses } from "config/variables";
import { StatefulContext, WithResponseMiddleware } from "types";

/**
 * End of pipeline middleware, that will return specified body and status to the user
 * @param {{body: any, status: number} | Function} sendResponse - a function that return
 * an object with a (optional) status and (optional) body keys to be return to the user
 * or directly and object an object with a (optional) status and (optional) body keys to be return
 */
const withResponse: WithResponseMiddleware = (sendResponse) => async (
  context: StatefulContext<any>
) => {
  try {
    if (typeof sendResponse === "function") {
      const responseData = await sendResponse(context);

      context.status = responseData.status || httpResponses.ok;
      context.body = responseData.body || { status: "success" };
    } else if (typeof sendResponse === "object") {
      context.status = sendResponse.status || httpResponses.ok;
      context.body = sendResponse.body || { status: "success" };
    }
  } catch (error) {
    context.throw(error);
  }
};

export default withResponse;
