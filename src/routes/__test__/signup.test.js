const request = require("supertest");
const server = require("../../../dist/server").default;

afterEach(() => {
  server.close()
});

describe('Signup router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/signup");
    expect(response.statusCode).toBe(200);
  });

  test('It responds to POST method with empty fields', async () => {
    const response = await request(server).post("/signup")
     .send({ email: '', password: '', nickname: ''});

    console.log('body', response.text); 
    const emailError = ' Please enter email';   
    const passwordError = 'Please enter password';
    const nicknameError = 'Please enter nickname';

    expect(response.text.includes(emailError)).toEqual(true); 
    expect(response.text.includes(passwordError)).toEqual(true); 
    expect(response.text.includes(nicknameError)).toEqual(true); 
    
    expect(response.statusCode).toBe(200);
  });
});