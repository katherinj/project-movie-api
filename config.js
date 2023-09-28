require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";

const IS_TESTING = process.env.NODE_ENV === "test";

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "root";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "password";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 3306;
  const dbName = process.env.DATABASE_NAME || "sakila";

  return (
    process.env.DATABASE_URL ||
    `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

console.log("App Config:".red);
console.log("PORT:".blue, PORT);
console.log("SECRET_KEY".blue, SECRET_KEY);
console.log("Database URI:".blue, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  SECRET_KEY,
  IS_TESTING,
  getDatabaseUri,
};
