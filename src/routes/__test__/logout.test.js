/* eslint-disable no-undef */
import request from "supertest";
import server from "../../../dist/server";

afterEach(() => {
  server.close()
});

describe('loguot router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/logout");
    expect(response.statusCode).toBe(302);
  });
});