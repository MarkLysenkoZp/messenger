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
  db.addColumn('users', 'created_at', {
    type: 'timestamp',
  }, callback);

  db.addColumn('users', 'confirmed_at', {
    type: 'timestamp',
  }, callback);


};

exports.down = function(db, callback) {
  db.removeColumn('users', 'created_at', callback);
  db.removeColumn('users', 'confirmed_at', callback);
};

exports._meta = {
  "version": 1
};
