const knex = require("../db/connection");

async function list() {
      return knex("movies").select("*");
    }

module.exports = {
  list,
};