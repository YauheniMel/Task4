const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'tableDB',
  password: 'hunter207',
  multipleStatements: true,
  connectionLimit: 100
});

module.exports = connection;
