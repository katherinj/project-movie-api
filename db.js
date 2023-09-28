const mysql = require("mysql");
const { getDatabaseUri } = require("./config");
require("colors");

const db = mysql.createConnection(getDatabaseUri());

db.connect((err) => {
  if (err) {
    console.error("connection error".red, err.stack);
  } else {
    console.log("Successfully connected to mysql db!".blue);
  }
});

module.exports = db;
