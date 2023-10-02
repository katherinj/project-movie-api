const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Movie {
  static async fetchAllMovies() {
    const query = `
    SELECT film.film_id, film.title, category.category_id, category.name
    FROM film
    LEFT JOIN film_category
    ON film.film_id = film_category.film_id
    LEFT JOIN category
    ON film_category.category_id = category.category_id
    ORDER BY category.name, film.title;
    
    `;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      if (result.length === 0) {
        throw new NotFoundError("No movies found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async fetchMovieById(id) {
    if (!id) {
      throw new BadRequestError("No movie id provided");
    }
    const query = `
      SELECT film.film_id, film.title, category.category_id, category.name
      FROM film
      LEFT JOIN film_category ON film.film_id = film_category.film_id
      LEFT JOIN category ON film_category.category_id = category.category_id
      WHERE film.film_id = ?
      ORDER BY category.name, film.title;
    `;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      if (result.length === 0) {
        throw new NotFoundError("No movie found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async fetchTopFiveMovies() {
    const query = `
      SELECT film.film_id, film.title, film.description, film.description, film.release_year, film.rating, film.length, COUNT(*) AS rented
      FROM rental
      LEFT JOIN inventory
      ON rental.inventory_id = inventory.inventory_id
      LEFT JOIN film
      ON inventory.film_id = film.film_id
      GROUP BY film.film_id, film.title
      ORDER BY rented DESC
      LIMIT 5;
    `;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      if (result.length === 0) {
        throw new NotFoundError("No movies found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Movie;
