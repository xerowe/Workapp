const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  jobType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "empty"
  }
});

module.exports = mongoose.model("Task", taskSchema);
