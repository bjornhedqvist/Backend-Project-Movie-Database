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
    console.log(res.locals.movie);
    return next();
  }

  return next({ status: 404, message: `error: Movie cannot be found.` });
}

async function read(req, res) {
  const data = res.locals.movie;
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
