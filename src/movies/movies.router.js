const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.route("/")
    .get(cors(), controller.list)
    .all(methodNotAllowed);

router.route("/:movieId")
    .all(cors())
    .get(controller.read)

router.route("/:movieId/theaters")
    .all(cors())
    .get(controller.theatersPlaying)

module.exports = router;