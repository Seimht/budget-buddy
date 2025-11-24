const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../src/db");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const res = await pool.query(
      "SELECT id, email, google_id FROM users WHERE id=$1",
      [id]
    );
    if (res.rowCount === 0) return done(null, false);
    done(null, res.rows[0]);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        let res = await pool.query(
          "SELECT id, email, google_id FROM users WHERE google_id=$1",
          [googleId]
        );

        if (res.rowCount === 0) {
          res = await pool.query(
            "INSERT INTO users (email, google_id) VALUES ($1,$2) RETURNING id, email, google_id",
            [email, googleId]
          );
        }

        const user = res.rows[0];
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
