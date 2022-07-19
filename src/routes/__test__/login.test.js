const request = require("supertest");
const server = require("../../../dist/server").default;

afterEach(() => {
  server.close()
});

describe('login router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/login");
    expect(response.statusCode).toBe(200);
  });

  test('It responds to POST method with empty fields', async () => {
    const response = await request(server).post("/login")
    expect(response.statusCode).toBe(200);
  });
});