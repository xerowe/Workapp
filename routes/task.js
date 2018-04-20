const express = require("express");
const app = express();
const router = express.Router();
const Task = require("../models/task");

//CREATE - add new Task to DB
router.post("/", (req, res) => {
  // get data from form and add to task array
  let name = req.body.name;
  let desc = req.body.desc;
  let author = req.body.author;
  let newTask = {
    name: name,
    desc: desc,
    author: author
  };
  // Create a new task and save to DB
  Task.create(newTask, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to index page
      console.log(newlyCreated);
      res.redirect("/");
    }
  });
});

// SHOW TASK ROUTE
router.get("/:id", (req, res) => {
  Task.findById(req.params.id, (err, foundTask) => {
    if (err) {
      res.redirect("/new");
    } else {
      res.render("task/show", { task: foundTask });
    }
  });
});

// EDIT TASK ROUTE
router.get("/:id/edit", (req, res) => {
  Task.findById(req.params.id, (err, foundTask) => {
    if (err) {
      console.log(err);
    } else {
      res.render("task/edit", { task: foundTask });
    }
  });
});

// UPDATE TASK ROUTE
router.put("/:id", (req, res) => {
  // find and update the correct campground
  Task.findByIdAndUpdate(
    req.params.id,
    req.body.task,
    (err, updatedCampground) => {
      if (err) {
        res.redirect("back");
      } else {
        //redirect somewhere(show page)
        res.redirect("/task/" + req.params.id);
      }
    }
  );
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
