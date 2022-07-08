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
  db.createTable('messages', {
    columns: {
      id: { type: 'bigint', primaryKey: true, autoIncrement: true },
      sender_id: 'int',
      recipient_id: 'int',
      time: 'int',
      status: 'text',
      message: 'text',
      
    },
    ifNotExists: true
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('messages', { ifExists: true }, callback);
};

exports._meta = {
  "version": 1
};
