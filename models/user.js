const Mongoose = require("mongoose");

//create schema for user model
const userSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //validator to confirm field is email address
      validate: {
        validator: function (v) {
          return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [{ type: Mongoose.Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//create a virtual field to get count of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//create instance of model
const User = Mongoose.model("user", userSchema);

module.exports = User;
