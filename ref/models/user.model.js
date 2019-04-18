var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from users');
  },

  single: id => {
    return db.load(`select * from users where f_ID = ${id}`);
  },

  singleByName: name => {
    return db.load(`select * from users where f_Username = '${name}'`);
  },

  add: entity => {
    return db.add('users', entity);
  },

  update: entity => {
    return db.update('users', 'f_ID', entity);
  },

  delete: id => {
    return db.delete('users', 'f_ID', id);
  },
};
