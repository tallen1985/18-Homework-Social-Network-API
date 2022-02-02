const Mongoose = require("mongoose");

//function to format date upon query
const formatDate = (d) => {
  const date = new Date(d);
  return date.toLocaleDateString();
};

//Schema to create reaction model embedded into Thought model
const reactionSchema = new Mongoose.Schema(
  {
    reactionId: {
      type: Mongoose.Schema.ObjectId,
      auto: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//Schema to create Thought Model
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
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
    },
    id: false,
  }
);
//create a virtual field to display amount of reactions.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create the thought Object.
const Thought = Mongoose.model("thought", thoughtSchema);

module.exports = Thought;
