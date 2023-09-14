const express = require("express");
const app = express();

app.use(express.json());

app.get("/", async (req, res, next) => {
  res.send("Hello World!");
});

module.exports = app;
