var mysql = require('mysql');

var createConnection = () => mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'qlbh',
});

module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.end();
      });
    });
  },

  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `insert into ${tableName} set ?`;
      connection.connect();
      connection.query(sql, entity, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
        connection.end();
      });
    });
  },

  update: (tableName, idField, entity) => {
    return new Promise((resolve, reject) => {

      if (entity[idField]) {
        const id = entity[idField];
        delete entity[idField];

        var connection = createConnection();
        var sql = `update ${tableName} set ? where ${idField} = ?`;
        connection.connect();
        connection.query(sql, [entity, id], (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.changedRows);
          }
          connection.end();
        });
      }
    });
  },

  delete: (tableName, idField, id) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `delete from ${tableName} where ${idField} = ?`;
      connection.connect();
      connection.query(sql, id, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
        connection.end();
      });
    });
  }

  // load: (sql, fn) => {
  //   var connection = createConnection();
  //   connection.connect();
  //   connection.query(sql, (error, results, fields) => {
  //     if (error) {
  //       console.log(error.sqlMessage);
  //     } else {
  //       // console.log(results);
  //       fn(results);
  //     }
  //     connection.end();
  //   });
  // },

  // add: (tableName, entity, fn) => {
  //   var connection = createConnection();
  //   var sql = `insert into ${tableName} set ?`;
  //   connection.connect();
  //   connection.query(sql, entity, (error, results, fields) => {
  //     if (error) {
  //       console.log(error.sqlMessage);
  //     } else {
  //       fn(results.insertId);
  //     }
  //     connection.end();
  //   });
  // },

  // update: (tableName, idField, entity, id, fn) => {
  //   var connection = createConnection();
  //   var sql = `update ${tableName} set ? where ${idField} = ?`;
  //   connection.connect();
  //   connection.query(sql, [entity, id], (error, results, fields) => {
  //     if (error) {
  //       console.log(error.sqlMessage);
  //     } else {
  //       fn(results.changedRows);
  //     }
  //     connection.end();
  //   });
  // }
};
