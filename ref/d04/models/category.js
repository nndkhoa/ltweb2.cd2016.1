const db = require('../utils/db');

exports.all = () => db.load('select * from categories');