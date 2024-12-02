// services/cron.js
const cron = require("node-cron");
const { expenses } = require("../data/expenses");

const generateSummary = () => {
  const today = new Date();
  const month = today.getMonth() + 1; // Months are 0-indexed
  const year = today.getFullYear();

  // Calculate monthly total
  const monthlyTotal = expenses
    .filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() + 1 === month && expDate.getFullYear() === year;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  console.log(`Monthly Summary (${month}/${year}): $${monthlyTotal}`);
};

// Schedule the task to run at midnight on the first day of every month
cron.schedule("0 0 1 * *", generateSummary);

module.exports = { generateSummary };
