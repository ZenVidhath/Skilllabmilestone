// app.js
const express = require("express");
const bodyParser = require("body-parser");
const expenseRoutes = require("./routes/expenses");
const { generateSummary } = require("./services/cron");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/expenses", expenseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Run initial summary generation
generateSummary();
