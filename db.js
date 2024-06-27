const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Sneha@2012",
  database: "ecorp",
};

const db = mysql.createConnection(dbConfig);

module.exports = db;