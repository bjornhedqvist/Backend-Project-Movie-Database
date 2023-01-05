const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  let data = await service.list();

  const isShowing = req.query.is_showing;
  if (isShowing === "true") {
    data = await service.listShowing();
  }

  res.json({ data });
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  return next({ status: 404, message: `error: Movie cannot be found.` });
}

async function read(req, res) {
  const data = res.locals.movie;
  res.json({ data });
}

async function theatersPlaying(req, res){
    const data = await service.theatersPlaying(res.locals.movie.movie_id)
    res.json({ data })
}

async function criticsReviews(req, res){
    const data = await service.criticsReviews(res.locals.movie.movie_id)

    res.json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  theatersPlaying: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theatersPlaying)],
  criticsReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(criticsReviews) ]
};
