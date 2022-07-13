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

exports.up = function(db, callback){
  db.createTable('messages', {
    columns: {
      id: { type: 'bigint', primaryKey: true, autoIncrement: true },
      _sender_id: {
        type: 'int',
        unsigned: true,
        length: 10,
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
     
      _recipient_id: {
        type: 'int',
        unsigned: true,
        length: 10,
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
  
      _time: {
        type: 'int',
        unsigned: true,
        length: 10,
        notNull: true,
        foreignKey: {
          name: '',
          table: '',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: {}
        }
      },
    
      _status: {
        type: 'text',
        unsigned: true,
        length: 10,
        notNull: true,
        foreignKey: {
          name: '',
          table: '',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: {}
        }
      },
  
      _massage: {
        type: 'text',
        unsigned: true,
        length: 10,
        notNull: true,
        foreignKey: {
          name: '',
          table: '',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: {}
        }
      },
      },
      ifNotExists: true
    }, callback);
}

exports.down = function(db, callback) {
  db.dropTable('messages', { ifExists: true }, callback);
};

exports._meta = {
  "version": 1
};


