const request = require("supertest");
const server = require("../../dist/server").default;

afterEach(() => {
  server.close()
});

describe('Signup router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/signup");
    expect(response.statusCode).toBe(200);
  });
});