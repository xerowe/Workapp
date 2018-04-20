const express = require("express");
const app = express();
const router = express.Router();
const Task = require("../models/task");

//INDEX - show all Task
router.get("/", function(req, res) {
  // Get all tasks from DB
  Task.find({}, function(err, allTasks) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { tasks: allTasks });
    }
  });
});

//Show register form
router.get("/register", (req, res) => {
  res.render("register");
});

// Show login form
router.get("/login", (req, res) => {
  res.render("login");
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

// Show form to create new task
router.get("/new", (req, res) => {
  res.render("task/new");
});

// DELETE TASK ROUTE
router.delete("/:id", function(req, res) {
  Task.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send("no");
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;
