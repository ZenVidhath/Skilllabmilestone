const express = require("express");
const { expenses, categories } = require("../data/expenses");

const router = express.Router();

// POST /expenses - Add a new expense
router.post("/", (req, res) => {
  const { category, amount, date } = req.body;

  // Validation
  if (!categories.includes(category)) {
    return res.status(400).json({ status: "error", error: "Invalid category" });
  }
  if (amount <= 0 || typeof amount !== "number") {
    return res.status(400).json({ status: "error", error: "Invalid amount" });
  }
  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ status: "error", error: "Invalid date" });
  }

  // Add expense to the shared array
  expenses.push({ id: expenses.length + 1, category, amount, date });
  return res.json({ status: "success", data: { category, amount, date } });
});

// GET /expenses - Retrieve filtered expenses
router.get("/", (req, res) => {
  const { category, startDate, endDate } = req.query;

  let filteredExpenses = expenses;

  // Filter by category
  if (category) {
    filteredExpenses = filteredExpenses.filter((exp) => exp.category === category);
  }

  // Filter by date range
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    filteredExpenses = filteredExpenses.filter(
      (exp) => new Date(exp.date) >= start && new Date(exp.date) <= end
    );
  }

  res.json({ status: "success", data: filteredExpenses });
});

module.exports = router;
