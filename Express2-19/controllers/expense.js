const Expense = require("../models/expense");

exports.createNewExpense = (req, res, next) => {
  const title = req.body.title;
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  Expense.create({
    title,
    amount,
    description,
    category,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteExpense = (req, res, next) => {
  const expenseId = req.params.expenseId;
  Expense.findByPk(expenseId)
    .then((expense) => {
      expense.destroy();
      res.status(200).send("Expense Removed Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editExpense = (req, res, next) => {
  const expenseId = req.params.expenseId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedAmount = req.body.amount;
  const updatedCategory = req.body.category;
  Expense.findByPk(expenseId)
    .then((expense) => {
      expense.title = updatedTitle;
      expense.amount = updatedAmount;
      expense.description = updatedDescription;
      expense.category = updatedCategory;
      expense
        .save()
        .then((expense) => {
          return res.json({
            message: "Expense Updated Successfully",
            data: expense,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
