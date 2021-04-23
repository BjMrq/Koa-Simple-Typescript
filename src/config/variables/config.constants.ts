export const stateKeys = {
  helpers: "helpers",
  records: "records",
  transactions: "transactions",
  jwtPayload: "jwtPayload",
  validatedRequest: "validatedRequest",
} as const;

export const httpResponses = {
  ok: 200,
  updated: 201,
  error: 500,
  unauthorized: 400,
};
