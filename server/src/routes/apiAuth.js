const express = require("express");
const router = express.Router();


router.get("/me", (req, res) => {
  if (!req.user) {
    return res.json(null);
  }
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
});

module.exports = router;
