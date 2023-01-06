const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router
  .route("/:reviewId")
  .all(cors())
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
