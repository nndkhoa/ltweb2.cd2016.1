var config = require('../config/');
var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from products');
  },

  allByCat: catId => {
    return db.load(`select * from products where CatID = ${catId}`);
  },

  pageByCat: (catId, offset) => {
    var lim = config['paginate'].default;
    var sql = `select * from products where CatID = ${catId} limit ${lim} offset ${offset}`;
    return db.load(sql);
  },

  countByCat: catId => {
    var sql = `select count(*) as total from products where CatID = ${catId}`;
    return db.load(sql);
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