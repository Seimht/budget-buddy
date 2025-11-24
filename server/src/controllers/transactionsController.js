const pool = require("../db");

/**
 * GET /api/transactions
 * Return all transactions for the logged-in user
 */
exports.list = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY occurred_on DESC, id DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Server error fetching transactions" });
  }
};

/**
 * POST /api/transactions
 * Create a new transaction
 */
exports.create = async (req, res) => {
  const { amount, category, type, note, occurred_on } = req.body || {};

  const amt = Number(amount);

  if (!amount || Number.isNaN(amt) || !category || !type) {
    return res
      .status(400)
      .json({ error: "amount, category, and type are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO transactions
        (user_id, amount, category, type, note, occurred_on)
       VALUES
        ($1, $2, $3, $4, $5, COALESCE($6, CURRENT_DATE))
       RETURNING *`,
      [req.user.id, amt, category, type, note || null, occurred_on || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: "Server error creating transaction" });
  }
};

/**
 * PUT /api/transactions/:id
 * Update an existing transaction
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { amount, category, type, note, occurred_on } = req.body || {};

  const amt = Number(amount);

  if (!amount || Number.isNaN(amt) || !category || !type) {
    return res
      .status(400)
      .json({ error: "amount, category, and type are required" });
  }

  try {
    const result = await pool.query(
      `UPDATE transactions
       SET amount = $1,
           category = $2,
           type = $3,
           note = $4,
           occurred_on = COALESCE($5, occurred_on)
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [amt, category, type, note || null, occurred_on || null, id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ error: "Server error updating transaction" });
  }
};

/**
 * DELETE /api/transactions/:id
 * Remove a transaction
 */
exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: "Server error deleting transaction" });
  }
};

/**
 * GET /api/transactions/monthly
 * Returns monthly income/expense summary
 */
exports.monthlySummary = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        TO_CHAR(occurred_on, 'YYYY-MM') AS month,
        type,
        SUM(amount) AS total
      FROM transactions
      WHERE user_id = $1
      GROUP BY month, type
      ORDER BY month ASC;
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error getting monthly summary:", err);
    res.status(500).json({ error: "Server error getting monthly summary" });
  }
};
