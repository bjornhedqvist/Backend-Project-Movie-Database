const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res) {
  const data = await service.list()
  const config = {
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
    }
  const reduceMovies = reduceProperties("theater_id", config)
  res.json({ data: reduceMovies(data) })
}

module.exports = {
  list: asyncErrorBoundary(list)
};
