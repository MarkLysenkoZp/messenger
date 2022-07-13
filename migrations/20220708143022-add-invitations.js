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
  db.createTable('invitations', {
    columns: {
      id: { type: 'bigint', primaryKey: true, autoIncrement: true },
      _inviter_id: {
        type: 'int',
        unsigned: true,
        length: 10,
        notNull: true,
        foreignKey: {
          name: 'invitations_inviter_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: {
            inviter_id: 'id'
          }
        }
      },
     
      _invited_id: {
        type: 'int',
        unsigned: true,
        length: 10,
        notNull: true,
        foreignKey: {
          name: 'invitations_invited_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: {
             user_id:  'id'
          }
        }
      },
   
      _status: {
        type: 'string',
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
  }, callback );
}

exports.down = function(db, callback) {
  db.dropTable('invitations', { ifExists: true }, callback);
};

exports._meta = {
  "version":1
};

