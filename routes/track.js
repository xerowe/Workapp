const express = require("express");
const app = express();
const router = express.Router();
const Track = require("../models/track");
const Product = require("../models/product");
const middleware = require("../middleware");

//CREATE - add new country for tracking to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // get data from form and add to Product array
  let product = req.body.product;
  let country = req.body.country;
  let proof = req.body.proof;
  let qa = req.body.qa;
  let isFinishedProof = req.body.isFinishedProof;
  let isFinishedQa = req.body.isFinishedQa;
  let author = {
    id: req.user._id,
    username: req.user.username,
    avatar: req.user.avatar,
    email: req.user.email
  };
  let newTrack = {
    product: product,
    country: country,
    proof: proof,
    qa: qa,
    isFinishedProof: isFinishedProof,
    isFinishedQa: isFinishedQa,
    author: author
  };

  // Create a new country and save to DB
  Track.create(newTrack, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to index page
      console.log(newlyCreated);
      res.redirect("/");
    }
  });
});

// SHOW Tracking ROUTE
router.get("/:id", middleware.isLoggedIn, (req, res) => {
  Track.findById(req.params.id, (err, foundTrack) => {
    if (err) {
      res.redirect("/new");
    } else {
      Product.find({}, (err, foundProduct) => {
        res.render("track/show", { track: foundTrack, products: foundProduct });
      });
    }
  });
});

// EDIT Tracking ROUTE
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
  Track.findById(req.params.id, (err, foundTrack) => {
    if (err) {
      res.redirect("/new");
    } else {
      Product.find({}, (err, foundProduct) => {
        res.render("track/edit", { track: foundTrack, products: foundProduct });
      });
    }
  });
});

// UPDATE Tracking ROUTE
router.put("/:id", middleware.isLoggedIn, (req, res) => {
  // find and update the correct campground
  Track.findByIdAndUpdate(
    req.params.id,
    req.body.track,
    (err, updatedTrack) => {
      if (err) {
        res.redirect("back");
      } else {
        //redirect somewhere(show page)
        res.redirect("/track/" + req.params.id);
      }
    }
  );
});

// DELETE TASK ROUTE
router.delete("/:id", middleware.checkTrackingOwnership, function(req, res) {
  Track.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send("no");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
