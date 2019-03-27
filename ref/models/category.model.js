var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from categories');
  },

  single: id => {
    return db.load(`select * from categories where CatID = ${id}`);
  },

  /**
   * @param {*} entity { CatName: ... }
   */
  add: entity => {
    return db.add('categories', entity);
  },

  /**
   * @param {*} entity { CatID, CatName }
   */
  update: entity => {
    var id = entity.CatID;
    delete entity.CatID;
    return db.update('categories', 'CatID', entity, id);
  }
};
