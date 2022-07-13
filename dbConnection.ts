import { Sequelize } from 'sequelize';
import Debug from 'debug';
const debug = Debug('Messenger');
import 'dotenv/config';
import { loadEnv, env } from './env';

loadEnv(); // Executed synchronously before the rest of your app loads

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: 'postgres',
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // TODO: check why this debugger does not print out a msg
    debug('DEBUG: Connection has been established successfully.');
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
}

export default testConnection;