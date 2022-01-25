const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  addUser,
} = require("../../controllers/userController.js");

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getOneUser);

module.exports = router;
