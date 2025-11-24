const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: req.user });
});

module.exports = router;
