const Mongoose = require("mongoose");

const reactionSchema = new Mongoose.Schema(
  {
    reactionId: Mongoose.ObjectId,
    default: new Mongoose.ObjectId(),
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const thoughtSchema = new Mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
    reactions: [reactionSchema],
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = Mongoose.model("thought", thoughtSchema);

module.exports = Thought;
