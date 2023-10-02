const express = require("express");
const Movie = require("../models/movie");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.fetchAllMovies();
    return res.status(200).json({ movies });
  } catch (err) {
    next(err);
  }
});
router.get("/top5", async (req, res, next) => {
  try {
    const movies = await Movie.fetchTopFiveMovies();
    return res.status(200).json({ movies });
  } catch (err) {
    next(err);
  }
});

router.get("/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.fetchMovieById(movieId);
    return res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
