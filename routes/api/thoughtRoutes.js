const router = require("express").Router();
const {
  getAllThoughts,
  getOneThought,
  addThought,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getAllThoughts).post(addThought);

router.route("/:id").get(getOneThought);

module.exports = router;
