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
  //get one thought using id in URL (/api/thoughts/:id)
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
  //add a thought to database
  async addThought(req, res) {
    try {
      const username = req.body.username;
      const result = await Thought.create(req.body);

      const addToUser = await User.findOneAndUpdate(
        { _id: username },
        { $push: { thoughts: result._id } },
        { new: true }
      );

      res.status(200).json(addToUser);
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  async deleteThought(req, res) {
    try {
      const filter = { _id: req.params.id };
      const results = await Thought.findOneAndDelete(filter, { new: true });

      if (results) {
        res.status(200).json({ Deleted: results });
      } else {
        res.status(400).json(err);
      }
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  //insert reaction into thought. (/api/thought/:id/reaction)
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
  async updateThought(req, res) {
    try {
      const filter = { _id: req.params.id };
      const update = {
        username: req.body.username,
        thoughtText: req.body.thoughtText,
      };
      const results = await Thought.findOneAndUpdate(filter, update, {
        new: true,
      });
      if (results) {
        res.status(200).json({ results });
      } else {
        res.status(400).json(err);
      }
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  //delete reaction from thought (api/thought/:id/reaction)
  deleteReaction(req, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: {
            reactions: {
              reactionId: req.body.reactionId,
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
