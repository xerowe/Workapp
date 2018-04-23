const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const Task = require("../models/task");
const middleware = require("../middleware");

//INDEX - show all Task
router.get("/", middleware.isLoggedIn, function(req, res) {
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

router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
});

// Show login form
router.get("/login", (req, res) => {
  res.render("login");
});
//handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// Logout route
router.get("/logout", middleware.isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/login");
});

// Show form to create new task
router.get("/new", (req, res) => {
  res.render("task/new");
});

// DELETE TASK ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
  Task.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send("no");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
