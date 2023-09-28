const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const movieRoutes = require("./routes/movie");
const { NotFoundError } = require("./utils/errors");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/movie", movieRoutes);

app.get("/", async (req, res, next) => {
  res.status(200).json({ response: "Hello CS490 World!" });
});

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong in the application";

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
