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
      res.status(500).json({ Error: err });
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
      res.status(500).json({ Error: err });
    }
  },
  async addThought(req, res) {
    try {
      const username = req.body.username;
      const result = await Thought.create(req.body);

      const addToUser = await User.findOneAndUpdate(
        { _id: username },
        { $push: { thoughts: result._id } }
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  addReaction(req, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $push: {
            reactions: {
              reactionBody: req.body.reactionBody,
              username: req.body.username,
            },
          },
        },
        { new: true },
        (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      );
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
};
