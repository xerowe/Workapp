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
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
