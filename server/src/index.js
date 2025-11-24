const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("../auth/google");
require("dotenv").config();

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
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());


const authRouter = require("./routes/auth");
const apiAuthRouter = require("./routes/apiAuth");
const transactionsRouter = require("./routes/transactions");
const quoteRouter = require("./routes/quote");


app.use("/auth", authRouter);


app.use("/api/auth", apiAuthRouter);


app.use("/api/transactions", transactionsRouter);


app.use("/api/quote", quoteRouter);


app.get("/", (req, res) => {
  res.send("Budget Buddy API OK ✅");
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
