var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from categories');
  },

  allWithDetails: () => {
    return db.load(`
      select c.CatID, c.CatName, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName
    `);
  },

  single: id => {
    return db.load(`select * from categories where CatID = ${id}`);
  },

  /**
   * @param {*} entity { CatName }
   */
  add: entity => {
    return db.add('categories', entity);
  },

  /**
   * @param {*} entity { CatID, CatName }
   */
  update: entity => {
    return db.update('categories', 'CatID', entity);
  }
};
