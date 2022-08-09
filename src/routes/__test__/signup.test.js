/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const request = require("supertest");
// const server = require("../../../dist/server").default;

afterAll((done) => {
  server.close(done);
});

xdescribe('Signup router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/signup");
    expect(response.statusCode).toBe(200);
  });

  test('It responds to POST method with empty fields', async () => {
    const response = await request(server).post("/signup")
     .send({ email: '', password: '', nickname: ''});

    const emailError = ' Please enter email';   
    const passwordError = 'Please enter password';
    const nicknameError = 'Please enter nickname';

    expect(response.text.includes(emailError)).toEqual(true); 
    expect(response.text.includes(passwordError)).toEqual(true); 
    expect(response.text.includes(nicknameError)).toEqual(true); 
    
    expect(response.statusCode).toBe(200);
  });
});