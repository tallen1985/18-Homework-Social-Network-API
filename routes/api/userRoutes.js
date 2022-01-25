const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
