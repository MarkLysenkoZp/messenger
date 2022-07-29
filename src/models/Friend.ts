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

class Friend extends Model<InferAttributes<Friend>, InferCreationAttributes<Friend>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare friendId: number;
  declare userId: number;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    friendId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: User,
        // This is the column name of the referenced model
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: User,
        // This is the column name of the referenced model
        key: 'id',
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    modelName: 'Friend',
    tableName: 'friends',
    sequelize // passing the `sequelize` instance is required
  }
);

export default Friend;