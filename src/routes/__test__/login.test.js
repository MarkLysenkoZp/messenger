/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require("supertest");
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
      .send({email: 'john@mail.com' });
      
    const errorMessage = 'User not Found';
    expect(response.text.includes(errorMessage)).toEqual(true); 
    expect(response.statusCode).toBe(200);
  });
});