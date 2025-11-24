require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const authRoutes = require("./routes/auth");
const apiAuthRoutes = require("./routes/apiAuth");
const transactionRoutes = require("./routes/transactions");
const quoteRoutes = require("./routes/quote");

require("../auth/google"); // Google OAuth config

const app = express();

// ---------- MIDDLEWARE ----------
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // MUST BE FALSE for localhost
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("Budget Buddy API is running ✅");
});

app.use("/auth", authRoutes);
app.use("/api/auth", apiAuthRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/quote", quoteRoutes);


const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
