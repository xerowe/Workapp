const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      require: true
    },
    country: {
      type: String,
      require: true
    },
    proof: {
      type: Date,
      default: Date.now
    },
    qa: {
      type: Date,
      default: Date.now
    },
    isFinishedProof: {
      type: String,
      default: "of"
    },
    isFinishedQa: {
      type: String,
      default: "of"
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String,
      avatar: String,
      email: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
