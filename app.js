const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const Task = require("./models/task");

//requiring routes
const indexRoutes = require("./routes/index");
const taskRoutes = require("./routes/task");

// Connect to the DB
mongoose.connect("mongodb://miro:miro@ds247479.mlab.com:47479/work-app");
app.use(bodyParser.urlencoded({ extended: true }));
// Set  the view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/", indexRoutes);
app.use("/task", taskRoutes);

//The 404 Route
app.get("*", function(req, res) {
  res.status(404).send("Page Not Found");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
