const { connect, connection } = require("mongoose");

//incorporate ENV string for Heroku Deployment
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetwork";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
