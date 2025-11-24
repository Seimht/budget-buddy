const express = require("express");
const router = express.Router();

const requireLogin = require("../middleware/requireLogin");
const {
  list,
  create,
  update,
  remove,
  monthlySummary,
} = require("../controllers/transactionsController");

// Get all transactions
router.get("/", requireLogin, list);

// Monthly summary 
router.get("/monthly", requireLogin, monthlySummary);

// Create transaction
router.post("/", requireLogin, create);

// Update transaction
router.put("/:id", requireLogin, update);

// Delete transaction
router.delete("/:id", requireLogin, remove);

module.exports = router;
