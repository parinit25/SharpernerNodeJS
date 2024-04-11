const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsdatabase",
  password: "Node@12345",
});

module.exports = pool.promise();
