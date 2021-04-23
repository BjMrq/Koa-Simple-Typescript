import { Schema } from "joi";
import Koa, {
  DefaultState,
  Context,
  Middleware,
  ParameterizedContext,
  Next,
} from "koa";

import { stateKeys } from "config/variables";

export type EncodedAuthData = { userId: string };

// General Koa //

// Add global middlewares with context
export type ContextWithGlobalMiddleware = Context;

// Define global Middleware
export type AuthenticatedMiddleware<M = undefined> = {
  authenticated: {
    user: M;
    token: string;
  };
};

// Define if custom default state
export type StateWithGlobalMiddleware<M = DefaultState> = ParameterizedContext<
  AuthenticatedMiddleware<EncodedAuthData> & M
>;

export type StateNotAuthWithGlobalMiddleware<
  M = DefaultState
> = ParameterizedContext<AuthenticatedMiddleware & M>;

export type AugmentedContextAndState<M> = ContextWithGlobalMiddleware &
  StateWithGlobalMiddleware<M>;

export type AugmentedNotAuthContextAndState<M> = ContextWithGlobalMiddleware &
  StateNotAuthWithGlobalMiddleware<M>;

// Koa
export type StatefulKoa = Koa<
  StateWithGlobalMiddleware,
  ContextWithGlobalMiddleware
>;

// Middleware with state
export type StatefulMiddleware<M = DefaultState> = Middleware<
  AuthenticatedMiddleware<EncodedAuthData> & M,
  ContextWithGlobalMiddleware
>;

export type StatefulNotAuthMiddleware<M = DefaultState> = Middleware<
  AuthenticatedMiddleware & M,
  ContextWithGlobalMiddleware
>;

// Custom contexts
export type StatefulContext<
  M extends RequestSchema | RecordsSchema | DefaultState = DefaultState
> = AugmentedContextAndState<M>;

export type StatefulNotAuthContext<
  M extends RequestSchema | RecordsSchema | DefaultState = DefaultState
> = AugmentedNotAuthContextAndState<M>;

// Schema
export type StateKeys = keyof typeof stateKeys;

export type RecordsSchema<
  M extends Record<string, unknown> = Record<string, unknown>
> = {
  records: M;
};

export type TransactionSchema<
  M extends Record<string, unknown> = Record<string, unknown>
> = {
  transactions: M;
};

export type HelperSchema<
  M extends Record<string, unknown> = Record<string, unknown>
> = {
  helpers: M;
};

export type RequestSchema<
  M extends Record<string, unknown> = Record<string, unknown>
> = {
  validatedRequest: M;
};

export type StateSchemas =
  | RecordsSchema
  | TransactionSchema
  | HelperSchema
  | RequestSchema;
// General state mutation middleware

export type requestValidationOrigin = "params" | "query" | "body";

export type ValidateRequestMiddleware = (
  origin: requestValidationOrigin
) => (
  schema: Schema
) => (context: StatefulContext, next: Next) => Promise<void>;

export type GetRecordMiddleware = <
  M extends RecordsSchema,
  T extends StateSchemas | DefaultState = DefaultState
>(
  getRecordFunction: (
    context: StatefulContext<T>
  ) => Promise<M["records"]> | M["records"]
) => StatefulMiddleware;

export type WithTransactionMiddleware = <
  M extends TransactionSchema,
  T extends StateSchemas | DefaultState = DefaultState
>(
  withTransactionFunction: (
    context: StatefulContext<T>
  ) => Promise<M["transactions"]> | M["transactions"]
) => StatefulMiddleware;

type PossibleRequestIdentity = RequestSchema<{ userId: string; repId: string }>;

export type AccessMiddleware = (
  keyToCompare: keyof PossibleRequestIdentity["validatedRequest"]
) => StatefulMiddleware<AuthenticatedMiddleware & PossibleRequestIdentity>;

export type WithHelperMiddleware = <
  M extends HelperSchema,
  T extends StateSchemas | DefaultState = DefaultState
>(
  withHelperFunction: (
    context: StatefulContext<T>
  ) => Promise<M["helpers"]> | M["helpers"]
) => StatefulMiddleware;

export type GuardMiddleware = <
  T extends StateSchemas | DefaultState = DefaultState
>(
  guardFunction: (
    context: StatefulContext<T>
  ) =>
    | Promise<{
        condition: boolean;
        errorIfConditionNotMet: Error;
      }>
    | {
        condition: boolean;
        errorIfConditionNotMet: Error;
      }
) => StatefulMiddleware;

type WithResponse<M = unknown> = {
  status?: number;
  body?: M;
};

export type WithResponseMiddleware = <
  M = unknown,
  T extends StateSchemas | DefaultState = DefaultState
>(
  sendResponse:
    | WithResponse<M>
    | ((
        context: StatefulContext<T>
      ) => Promise<WithResponse<M>> | WithResponse<M>)
) => (context: StatefulContext) => Promise<void>;

// Possible states //

export type WithUuid = {
  requestUuid: string;
};

export type WithBody<M> = {
  request: {
    body: M;
  };
};
