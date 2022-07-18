import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../dbConnection';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare nickname: string;
  declare phone: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  declare confirmedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter email'
        }
      }
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter password'
        },
        notEmpty: {
          msg: 'Please enter password'
        },
      }
    },
    nickname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please enter nickname'
        },
        notEmpty: {
          msg: 'Please enter nickname'
        },
      }
    },
    phone: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    confirmedAt: DataTypes.DATE,
  },
  {
    tableName: 'users',
    sequelize // passing the `sequelize` instance is required
  }
);

export default User;