const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
  await service.list()
  const data = await service.reduceWithMovies()
  console.log(data)
  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list)
};
