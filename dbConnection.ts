import { Sequelize } from 'sequelize';
import Debug from 'debug';
const debug = Debug("Messenger");

const sequelize = new Sequelize('messenger_development', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
});

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