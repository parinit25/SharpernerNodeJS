const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const Expense = require("./models/expense");

app.use(cors());

app.use(bodyParser.json({ extended: true }));

app.use("/expenses", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
