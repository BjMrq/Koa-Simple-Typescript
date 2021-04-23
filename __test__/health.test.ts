import requestSetUp from "supertest";

import configServer from "config/server";

const server = configServer();
const request = requestSetUp(server.callback());

test("Can perform health check", async () => {
  // Try to access one user
  const response = await request.get("/health");

  //  Not authorized action
  expect(response.status).toBe(200);
});
