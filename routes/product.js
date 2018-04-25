const express = require("express");
const app = express();
const router = express.Router();
const Product = require("../models/product");
const middleware = require("../middleware");

//CREATE - add new Product to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // get data from form and add to Product array
  let name = req.body.name;
  let campLink = req.body.campLink;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newProduct = {
    name: name,
    campLink: campLink,
    author: author
  };
  // Create a new product and save to DB
  Product.create(newProduct, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to index page
      console.log(newlyCreated);
      res.redirect("/");
    }
  });
});

// SHOW Product ROUTE
router.get("/:id", middleware.isLoggedIn, (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    if (err) {
      res.redirect("/new");
    } else {
      res.render("product/show", { product: foundProduct });
    }
  });
});

// EDIT Product ROUTE
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    if (err) {
      console.log(err);
    } else {
      res.render("product/edit", { prodcut: foundProduct });
    }
  });
});

// UPDATE Product ROUTE
router.put("/:id", middleware.isLoggedIn, (req, res) => {
  // find and update the correct campground
  Product.findByIdAndUpdate(
    req.params.id,
    req.body.product,
    (err, updatedProduct) => {
      if (err) {
        res.redirect("back");
      } else {
        //redirect somewhere(show page)
        res.redirect("/product/" + req.params.id);
      }
    }
  );
});

// DELETE Product ROUTE
router.delete("/:id", middleware.checkProductOwnership, function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send("no");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
