const mysql = require('mysql2');

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  waitForConnections: true
});

const prepareExecuteQuery = (pool) => async (query) => {
  const connection = await pool.promise().getConnection();

  const [result] = await connection.execute(query);

  connection.release();

  return result;
};

module.exports.executeQuery = prepareExecuteQuery(connectionPool);
