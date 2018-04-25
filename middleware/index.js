const Task = require("../models/task");
const Track = require("../models/track");
const Product = require("../models/product");

// all the middleare goes here
let middlewareObj = {};

middlewareObj.checkTrackingOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Track.findById(req.params.id, (err, foundTrack) => {
      if (err) {
        req.flash("error", "Tracking Country not found");
        res.redirect("back");
      } else {
        // does user own the task?
        if (foundTrack.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkTaskOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Task.findById(req.params.id, (err, foundTask) => {
      if (err) {
        req.flash("error", "Task not found");
        res.redirect("back");
      } else {
        // does user own the task?
        if (foundTask.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkProductOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Product.findById(req.params.id, (err, foundProduct) => {
      if (err) {
        req.flash("error", "Product not found");
        res.redirect("back");
      } else {
        // does user own the task?
        if (foundProduct.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
};

module.exports = middlewareObj;
