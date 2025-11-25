const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../src/db");

const GOOGLE_CALLBACK =
  process.env.NODE_ENV === "production"
    ? "https://budget-buddy-api-uic5.onrender.com/auth/google/callback"
    : "http://localhost:5050/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: GOOGLE_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;

        
        const existingUser = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [googleId]
        );

        if (existingUser.rows.length > 0) {
          return done(null, existingUser.rows[0]);
        }

      
        const newUser = await pool.query(
          "INSERT INTO users (email, google_id) VALUES ($1, $2) RETURNING *",
          [email, googleId]
        );

        return done(null, newUser.rows[0]);
      } catch (err) {
        console.error("Google OAuth error:", err);
        return done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});
