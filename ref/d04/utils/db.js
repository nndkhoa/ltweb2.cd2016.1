var mysql = require('mysql');

var createConnection = () => mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'qlbh',
});

exports.load = sql => new Promise((resolve, reject) => {
  var connection = createConnection();
  connection.connect();
  connection.query(sql, (error, results, fields) => {
    if (error) {
      if (error.sqlMessage) {
        reject(error.sqlMessage);
      } else reject(error);
    } else {
      resolve(results);
    }
    connection.end();
  });
});

exports.add = (tableName, entity) => new Promise((resolve, reject) => {
  var connection = createConnection();
  var sql = `insert into ${tableName} set ?`;
  connection.connect();
  connection.query(sql, entity, (error, results) => {
    if (error) {
      if (error.sqlMessage) {
        reject(error.sqlMessage);
      } else reject(error);
    } else {
      resolve(results.insertId);
    }
    connection.end();
  });
});

exports.update = (tableName, idField, entity, id) => new Promise((resolve, reject) => {
  var connection = createConnection();
  var sql = `update ${tableName} set ? where ${idField} = ?`;
  connection.connect();
  connection.query(sql, [entity, id], (error, results, fields) => {
    if (error) {
      if (error.sqlMessage) {
        reject(error.sqlMessage);
      } else reject(error);
    } else {
      resolve(results.changedRows);
    }
    connection.end();
  });
});