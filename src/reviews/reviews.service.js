const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

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

async function theatersPlaying(movieId){
    return knex("movies_theaters as mt")
        .join("theaters as t", "t.theater_id", "mt.theater_id" )
        .select("*")
        .where({ movie_id: movieId })
        .andWhere("mt.is_showing", true)
        .groupBy("t.theater_id")
}

const addCritic = mapProperties({
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name"
})

async function criticsReviews(movieId){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where({"r.movie_id": movieId})
        .then((data)=> data.map((i)=> addCritic(i)))
}

module.exports = {
  list,
  listShowing,
  read,
  theatersPlaying,
  criticsReviews,
};
