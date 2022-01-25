const { User, Thought } = require("../models");

module.exports = {
  //get all users
  async getAllUsers(req, res) {
    try {
      const result = await User.find().populate("thoughts");
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "No Users Found" });
      }
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  async getOneUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.id });
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "No Users Found" });
      }
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  async addUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
};
