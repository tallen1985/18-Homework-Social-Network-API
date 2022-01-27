const router = require("express").Router();
const {
  getAllThoughts,
  getOneThought,
  addThought,
  addReaction,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getAllThoughts).post(addThought);

router.route("/:id").get(getOneThought);

router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;
