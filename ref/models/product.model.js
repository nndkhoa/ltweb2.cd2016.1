var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from products');
  },

  allByCat: catId => {
    return db.load(`select * from products where CatID = ${catId}`);
  },

  single: id => {
    return db.load(`select * from products where ProID = ${id}`);
  },

  add: entity => {
    return db.add('products', entity);
  },

  update: entity => {
    return db.update('products', 'ProID', entity);
  }
};