const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejsdatabase", "root", "Node@12345", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
