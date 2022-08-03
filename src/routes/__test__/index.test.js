/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const request = require("supertest");
const server = require("../../../dist/server").default;

afterEach(() => {
  server.close()
});

describe('index router', () => {
  // eslint-disable-next-line no-undef
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/");
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(302);
  });
});