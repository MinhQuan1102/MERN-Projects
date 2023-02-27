const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginSuccess, loginFail, logout } = require('../controllers/authController');
const CLIENT_URL = "http://localhost:3000/login";
const passport = require("passport");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login/success", loginSuccess);
router.get("/logout", logout)
router.get("/login/failed", loginFail);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;