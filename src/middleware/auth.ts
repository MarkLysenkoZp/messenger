import { verify } from "jsonwebtoken";
import 'dotenv/config';
import { loadEnv, env } from '../env';
import  {  Request, Response, } from 'express';

loadEnv(); 

export const authorization = (req: Request, res: Response, next: any) => {
  //get the token from the header if present
  const token = req.headers["Authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.redirect('/login');

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = verify(token, env.JWT_PRIVATE_KEY);
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};