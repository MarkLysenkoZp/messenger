'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.addColumn( 'users', 'avatar', { type: 'string' }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('users', 'avatar', callback);
};

exports._meta = {
  "version": 1
};
