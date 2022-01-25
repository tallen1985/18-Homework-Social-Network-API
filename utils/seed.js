const connection = require("../config/connection");
const { Thought, User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Add students to the collection and await the results
  await User.create({
    username: "jakeAllen",
    email: "jake@allen.com",
  });

  await Thought.create({
    thoughtText: "This is a new thought",
  });
  //t Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
