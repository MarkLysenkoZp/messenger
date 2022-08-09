const request = require("supertest");
const server = require("../../../dist/server").default;

afterAll((done) => {
  server.close(done);
});

describe('Profile router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/profile");
    expect(response.statusCode).toBe(302);
  });
});