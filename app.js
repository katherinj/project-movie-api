const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
  res.status(200).json({ response: "Hello CS490 World!" });
});

module.exports = app;
