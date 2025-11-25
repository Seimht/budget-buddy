require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

// Routes
const authRoutes = require("./routes/auth");
const apiAuthRoutes = require("./routes/apiAuth");
const transactionRoutes = require("./routes/transactions");
const quoteRoutes = require("./routes/quote");

// Google OAuth config
require("../auth/google");

const app = express();



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
  res.send("✅ Budget Buddy API is running");
});

// Authentication
app.use("/auth", authRoutes);
app.use("/api/auth", apiAuthRoutes);

// App features
app.use("/api/transactions", transactionRoutes);
app.use("/api/quote", quoteRoutes);



const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
