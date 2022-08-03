import 'dotenv/config';
import { loadEnv, env } from '../env';
import AWS from 'aws-sdk';

loadEnv();

export const initS3Instance = () => {
  return new AWS.S3({ accessKeyId: env.AWS_ACCESS_KEY, secretAccessKey: env.AWS_SECRET_KEY });
}