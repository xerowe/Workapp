const Task = require("../models/task");

// all the middleare goes here
let middlewareObj = {};

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

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
};

module.exports = middlewareObj;
