import request from "supertest";
import app from '../../../dist/app';
import http from 'http';
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe('Profile router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/profile");
    expect(response.statusCode).toBe(302);
  });
});