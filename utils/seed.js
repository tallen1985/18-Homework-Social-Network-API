const connection = require("../config/connection");
const { Thought, User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  // Drop existing users
  await Thought.deleteMany({});

  await User.create({
    username: "jakeAllen",
    email: "jake@allen.com",
  });

  const reactionData = [
    {
      reactionBody: "This is a reaction",
      username: "jakeAllen",
    },
    {
      reactionBody: "Wow another Reaction",
      username: "BigLou",
    },
  ];
  await Thought.create({
    thoughtText: "This is a new thought",
    reactions: reactionData,
  });
  //t Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
