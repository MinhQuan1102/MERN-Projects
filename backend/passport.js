const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const passport = require('passport')
const GOOGLE_CLIENT_ID = "329506102378-cq2qf6v9psqr8e0s1pujs6nhpe7608mm.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = "045fb8af4819bcc90325"
const GITHUB_CLIENT_SECRET = "146684d8e0369e6544f588756d48c09f0a3edf06";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile)
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile)
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})