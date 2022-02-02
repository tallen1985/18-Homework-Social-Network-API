const { User, Thought } = require("../models");
const { findOneAndUpdate } = require("../models/thought");

module.exports = {
  //get all users
  async getAllUsers(req, res) {
    try {
      const result = await User.find()
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "No Users Found" });
      }
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  //get one user using _id in URL
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
  //add user using request body {username, email}
  async addUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  //update user based on _id in URL
  async updateUser(req, res) {
    try {
      const filter = { _id: req.params.id };
      const update = {
        username: req.body.username,
        email: req.body.email,
      };
      const results = await User.findOneAndUpdate(filter, update, {
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
  //delete user based on _Id sent in through URL
  async deleteUser(req, res) {
    try {
      const filter = { _id: req.params.id };
      const results = await User.findOneAndDelete(filter, { new: true });

      if (results) {
        res.status(200).json({ Deleted: results });
      } else {
        res.status(400).json(err);
      }
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  //add a friend to user (api/users/:id/friend/:friendId)
  addFriend(req, res) {
    try {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true },
        (err, userData) => {
          if (userData) {
            res.status(200).json(userData);
          } else {
            res.status(400).json(err);
          }
        }
      );
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
  //delete friend from User (api/users/:id/friend/:friendId)
  deleteFriend(req, res) {
    try {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true },
        (err, userData) => {
          if (userData) {
            res.status(200).json(userData);
          } else {
            res.status(400).json(err);
          }
        }
      );
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  },
};
