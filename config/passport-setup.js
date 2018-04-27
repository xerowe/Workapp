const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/login/google/redirect",
      clientID:
        "531682777925-dmsgcchib48dmh3fnkmq7boio9t6c8i2.apps.googleusercontent.com",
      clientSecret: "WbK5Ty91J0Q6VjQpbTxdFfDV"
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
    }
  )
);
