const router = require("express").Router();
const passport = require("passport");
const {
  signUp,
  logIn,
  getMe,
  continueWithGoogle,
  googleCallback,
  logout,
} = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.Middleware");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const {
  googleClientId,
  googleClientSecret,
} = require("../config/environments/config");

router.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/me", authUser, getMe);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleCallback
);

router.post("/logout", logout);

module.exports = router;
