import {
  Model,
  DataTypes,
  Deferrable,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../dbConnection';
import User from './User';

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare userId: number;
  declare recipientId: number;
  declare message: string;
  declare status: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: User,
        // This is the column name of the referenced model
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    recipientId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: User,
        // This is the column name of the referenced model
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    message: DataTypes.TEXT,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    modelName: 'Message',
    tableName: 'messages',
    sequelize
  }
);

export default Message;