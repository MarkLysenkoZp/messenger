import {
  Model,
  DataTypes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../dbConnection';
import Friend from './Friend';
import Message from './Message';

class User extends Model {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare nickname: string;
  declare avatar: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  declare confirmedAt: CreationOptional<Date>;
  // This is a stub for typescript checker
  getFriends: any;
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
    avatar: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    confirmedAt: DataTypes.DATE,
  },
  {
    modelName: 'User',
    tableName: 'users',
    sequelize
  }
);

User.belongsToMany(User, { through: Friend, as: "Friends", foreignKey: "userId", otherKey: 'friendId' });
User.hasMany(Message, { foreignKey: 'userId' });

Message.belongsTo(User, { foreignKey: 'userId' });

export default User;