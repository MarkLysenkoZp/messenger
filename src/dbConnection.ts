import { Sequelize } from 'sequelize';
import Debug from 'debug';
const debug = Debug('Messenger');
import 'dotenv/config';
import { loadEnv, env } from './env';

loadEnv(); // Executed synchronously before the rest of your app loads

const dbOptions = () => {
  if(process.env.NODE_ENV === 'production') {
    return {
      ssl: { require: true, rejectUnauthorized: false }
    }
  }

  return {};
}

const initSequelize = () => {
  return new Sequelize(env.DATABASE_URL, { dialectOptions: dbOptions() });
}

export const sequelize = initSequelize();

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // TODO: check why this debugger does not print out a msg
    debug('DEBUG: Connection has been established successfully.');
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
}