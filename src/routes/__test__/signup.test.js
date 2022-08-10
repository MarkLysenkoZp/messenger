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

describe('Signup router', () => {
  test('It should respond to GET method', async () => {
    const response = await request(server).get("/signup");
    expect(response.statusCode).toBe(200);
  });

  xtest('It responds to POST method with empty fields', async () => {
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

  test('It should render success message', async () => {
    const success = 'Account was deleted';
    const response = await request(server).get("/signup?success=ok");
    expect(response.text.includes(success)).toEqual(true);
    expect(response.statusCode).toBe(200);
  });
});