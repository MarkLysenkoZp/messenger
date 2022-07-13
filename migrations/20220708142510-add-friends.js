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
  db.createTable( 'friends',{
        contact_id:
        {
          type: 'int',
          unsigned: true,
          length: 10,
          notNull: true,
          foreignKey: {
            name: 'friends_contact_id_fk',
            table: 'users',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            },
            mapping: {
              contact_id: 'id'
            }
          }
        },
          user_id:
          {
            type: 'int',
            unsigned: true,
            length: 10,
            notNull: true,
            foreignKey:{
              name: 'friends_user_id_fk',
              table: 'users',
              rules: {
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT'
              },

              mapping: {
                user_id: 'id'
              }
            }
          }
  }, callback );
};

exports.down = function(db, callback) {
  db.dropTable('friends', { ifExists: true }, callback);
};

exports._meta = {
  "version": 1
};
  
  

