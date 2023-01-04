const knex = require("../db/connection");

async function list() {
  return knex("movies").select("*");
}

async function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where("mt.is_showing", true)
    .groupBy("m.movie_id", "mt.is_showing");
}

async function read(movieId){
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first()
}

module.exports = {
  list,
  listShowing,
  read,
};
