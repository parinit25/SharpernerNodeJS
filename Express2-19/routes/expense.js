const express = require("express");
const router = express.Router();
const expenseControllers = require("../controllers/expense");

router.post("/add-expense", expenseControllers.createNewExpense);
router.get("/", expenseControllers.getAllExpenses);
router.delete("/:expenseId", expenseControllers.deleteExpense);
router.put("/:expenseId", expenseControllers.editExpense);

module.exports = router;
