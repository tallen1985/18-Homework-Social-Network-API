const router = require("express").Router();
const {
  getAllThoughts,
  getOneThought,
  addThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getAllThoughts).post(addThought);

router
  .route("/:id")
  .get(getOneThought)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
