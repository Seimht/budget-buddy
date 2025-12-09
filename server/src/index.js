
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");


const authRoutes = require("./routes/auth");
const apiAuthRoutes = require("./routes/apiAuth");
const transactionRoutes = require("./routes/transactions");
const quoteRoutes = require("./routes/quote");


require("../auth/google");

const app = express();


const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,      
    credentials: true,       
  })
);

app.use(express.json());


const isProd = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
      secure: isProd,              
      sameSite: isProd ? "none" : "lax", 
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("✅ Budget Buddy API is running");
});


app.use("/auth", authRoutes);

app.use("/api/auth", apiAuthRoutes);


app.use("/api/transactions", transactionRoutes);
app.use("/api/quote", quoteRoutes);


const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(`CLIENT_URL: ${CLIENT_URL}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});
