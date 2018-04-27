const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const passportSetup = require("./config/passport-setup");
const User = require("./models/user");
const Task = require("./models/task");
const Track = require("./models/track");
const Product = require("./models/product");

//requiring routes
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const taskRoutes = require("./routes/task");
const trackRoutes = require("./routes/track");
const productRoutes = require("./routes/product");

// Connect to the DB
mongoose.connect("mongodb://miro:miro@ds247479.mlab.com:47479/work-app");
app.use(bodyParser.urlencoded({ extended: true }));
// Set  the view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// Passport Congiguration
app.use(
  require("express-session")({
    secret: "This is just a test",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", authRoutes);
app.use("/", indexRoutes);
app.use("/task", taskRoutes);
app.use("/track", trackRoutes);
app.use("/product", productRoutes);

//The 404 Route
app.get("*", function(req, res) {
  res.status(404).send("Page Not Found");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
