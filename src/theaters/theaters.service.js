const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

async function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"mt.theater_id": "t.theater_id"})
    .groupBy("t.theater_id");
}

const addMovies = reduceProperties("movie_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        created_at: ["movies", null, "created_at"],
        updated_at: ["movies", null, "updated_at"],
        is_showing: ["movies", null, "is_showing"],
        theater_id: ["movies", null, "theater_id"]
})

async function reduceWithMovies(){
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
    .where("mt.is_showing", true)
    .then(addMovies)
    // .then((updatedRecords) => updatedRecords[0])
}

module.exports = {
  list,
  reduceWithMovies
};
