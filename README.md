# Expense Tracker

This project is a simple expense tracking application built using Node.js and Express.js. The application allows users to record expenses, retrieve filtered expense data, and generate automated monthly summaries using CRON jobs.

---

## Features

- **Add Expenses**: Users can add expenses by specifying a category, amount, and date.
- **Retrieve Expenses**: Users can retrieve expenses with optional filters for category and date range.
- **Expense Analysis**: Analyze total spending by category and overall spending.
- **Automated Monthly Summary**: CRON job to calculate and log the total monthly expenses at the start of each month.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Data Storage**: In-memory JavaScript arrays (for demonstration purposes)
- **Task Scheduling**: `node-cron`
- **API Testing**: Postman

---

## File Structure

```
.
├── data
│   └── expenses.js        # Global data storage for expenses and categories
├── routes
│   └── expenses.js        # Expense-related API routes
├── services
│   └── cron.js            # CRON job to generate monthly summaries
├── app.js                 # Main application file
└── package.json           # Dependencies and project metadata
```

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node app.js
   ```

4. The server will run at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### **1. Add Expense**
- **Endpoint**: `POST /expenses`
- **Description**: Add a new expense.
- **Request Body**:
  ```json
  {
    "category": "Food",
    "amount": 100,
    "date": "2024-12-01"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "category": "Food",
      "amount": 100,
      "date": "2024-12-01"
    }
  }
  ```

### **2. Retrieve Expenses**
- **Endpoint**: `GET /expenses`
- **Description**: Retrieve expenses with optional filters.
- **Query Parameters**:
  - `category` (optional): Filter by category.
  - `startDate` and `endDate` (optional): Filter by date range.
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "category": "Food",
        "amount": 100,
        "date": "2024-12-01"
      }
    ]
  }
  ```

### **3. Analyze Expenses**
- **Endpoint**: `GET /expenses/analysis`
- **Description**: Analyze total and category-wise spending.
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "analysis": {
        "Food": 100,
        "Travel": 0,
        "Entertainment": 0,
        "Healthcare": 0,
        "Others": 0
      },
      "totalSpending": 100
    }
  }
  ```

---

## Automated Monthly Summary

A scheduled task runs at midnight on the first day of every month to calculate and log the total expenses for the previous month.

- **CRON Schedule**: `0 0 1 * *`
- **Log Output Example**:
  ```
  Monthly Summary (12/2024): $450
  ```

---

## Testing the Application

1. Start the server:
   ```bash
   node app.js
   ```

2. Use Postman or any API testing tool to interact with the API.

3. Test the CRON job by manually calling the `generateSummary` function in `services/cron.js`:
   ```javascript
   const { generateSummary } = require("./services/cron");
   generateSummary();
   ```

---

## Future Improvements

- Use a database (e.g., MongoDB, MySQL) for persistent data storage.
- Implement authentication for secure API access.
- Add a frontend interface for user interaction.

---

## License

This project is licensed under the MIT License.
