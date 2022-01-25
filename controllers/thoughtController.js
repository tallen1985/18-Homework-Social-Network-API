const { User, Thought } = require("../models");

module.exports = {
  //get all thoughts
  async getAllThoughts(req, res) {
    try {
      const result = await Thought.find().populate("username");
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "No Thoughts Found" });
      }
    } catch (err) {
      res.status(500).json({"Error": err});
    }
  },
  async getOneThought(req, res) {
    try {
      const result = await Thought.findOne({ _id: req.params.id });
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "No Thoughts Found" });
      }
    } catch (err) {
      res.status(500).json({"Error": err});
    }
  },
};
