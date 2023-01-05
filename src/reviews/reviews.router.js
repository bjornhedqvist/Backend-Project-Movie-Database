const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
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

router.route("/:movieId/reviews")
    .all(cors())
    .get(controller.criticsReviews)

module.exports = router;

// {
//     "data": [
//       {
//         "review_id": 1,
//         "content": "Lorem markdownum ...",
//         "score": 3,
//         "created_at": "2021-02-23T20:48:13.315Z",
//         "updated_at": "2021-02-23T20:48:13.315Z",
//         "critic_id": 1,
//         "movie_id": 1,
//         "critic": {
//           "critic_id": 1,
//           "preferred_name": "Chana",
//           "surname": "Gibson",
//           "organization_name": "Film Frenzy",
//           "created_at": "2021-02-23T20:48:13.308Z",
//           "updated_at": "2021-02-23T20:48:13.308Z"
//         }
//       }
//       // ...
//     ]
//   }