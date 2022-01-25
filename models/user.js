const Mongoose = require("mongoose");

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

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = Mongoose.model("user", userSchema);

module.exports = User;
