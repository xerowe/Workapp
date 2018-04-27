const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");

// // Login with Google
// router.get("/login/google", (req, res) => {
//   res.send("login with google");
// });

// Logout route
// router.get("/logout", middleware.isLoggedIn, (req, res) => {
//   req.logout();
//   res.redirect("/login");
// });

// auth with google
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// Callback route for google to redirect to
router.get(
  "/login/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send("you are at the callback route");
  }
);
module.exports = router;
