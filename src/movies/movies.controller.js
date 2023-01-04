const service = require("./movies.service");
// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    let data = await service.list();

    const isShowing = req.query.is_showing;
    if (isShowing === "true") {
         data = await service.listShowing()
    }
  
  res.json({
    data,
  });
}

module.exports = {
  // list: asyncErrorBoundary(list),
  list,
};
