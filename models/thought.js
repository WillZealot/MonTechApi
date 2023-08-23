const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toLocaleDateString(), // Example getter formatting the date
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Corrected placement of reactionSchema
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;