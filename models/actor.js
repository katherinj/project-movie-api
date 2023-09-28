const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Actor {
  static async fetchActorById(id) {
    if (!id) {
      throw new BadRequestError("No actor id provided");
    }
    const query = `
      SELECT actor.actor_id, actor.title, category.category_id, category.name
      FROM film
      LEFT JOIN film_category ON film.film_id = film_category.film_id
      LEFT JOIN category ON film_category.category_id = category.category_id
      WHERE actor.actor_id = ?;
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
        throw new NotFoundError("No actor found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Actor;
