const request = require("supertest");
const server = require("../../../dist/server").default;

afterEach(() => {
  server.close()
});

describe('index router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
  });
});