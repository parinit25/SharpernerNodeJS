const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const sequelize = require("./util/database");
const userRoutes = require("./routes/user");
const User = require("./models/user");

app.use(cors());

app.use(bodyParser.json({ extended: true }));



app.use("/users", userRoutes);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
