'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('messages',
  {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      sender_id: 
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'messages_sender_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: {
            sender_id: 'id'
          }
        }
      },
      recipient_id: 
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'messages_recipient_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: {
            recipient_id: 'id'
          }
        }
      },
      time:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
      },
      status: { type: 'string', notNull: true },
      massage: { type: 'text', notNull: true },
    },
    ifNotExists: true
  }, callback );
};

exports.down = function(db, callback) {
  db.dropTable('messages', { ifExists: true }, callback);
};

exports._meta = {
  "version": 1
};


