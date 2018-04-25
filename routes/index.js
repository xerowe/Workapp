const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const gravatar = require("gravatar");
const User = require("../models/user");
const Task = require("../models/task");
const Track = require("../models/track");
const Product = require("../models/product");
const middleware = require("../middleware");

//INDEX - show all Task
router.get("/", middleware.isLoggedIn, function(req, res) {
  // Get all tasks from DB
  Task.find({}, function(err, allTasks) {
    if (err) {
      console.log(err);
    } else {
      Product.find({}, (err, allProduct) => {
        if (err) {
          console.log(err);
        } else {
          Track.find({}, (err, foundTrack) => {
            if (err) {
              console.log(err);
            } else {
              res.render("index", {
                tasks: allTasks,
                products: allProduct,
                tracks: foundTrack
              });
            }
          });
        }
      });
    }
  });
});

//Show register form
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const avatar = gravatar.url(req.body.email, {
    s: "200", // Size
    r: "pg",
    d: "mm" // Default avatar
  });
  const newUser = new User({ username: req.body.username, avatar: avatar });
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
router.get("/task/new", (req, res) => {
  res.render("task/new");
});

// Show form to create new product
router.get("/product/new", (req, res) => {
  res.render("product/new");
});

// Show form to create new Tracking Country
router.get("/track/new", (req, res) => {
  Product.find({}, (err, foundProduct) => {
    if (err) {
      console.log(err);
    } else {
      res.render("track/new", { products: foundProduct });
    }
  });
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

// SHOW USER PROFILE
router.get("/user/:id/profile", middleware.isLoggedIn, (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      res.render("user/profile", { user: foundUser });
    }
  });
});

module.exports = router;
