
const express = require("express");
const router = express.Router();


router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ user: null });
  }

  res.json({
    id: req.user.id,
    email: req.user.email,
  });
});


router.post("/logout", (req, res) => {

  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }

  
    req.session.destroy((err2) => {
      if (err2) {
        console.error("Session destroy error:", err2);
        return res.status(500).json({ error: "Session destroy failed" });
      }

      
      res.clearCookie("connect.sid");
      return res.json({ success: true });
    });
  });
});

module.exports = router;
