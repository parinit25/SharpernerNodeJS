const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Expense = sequelize.define(
  "expense",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "Food",
        "Shopping",
        "Travel",
        "Movies",
        "Rent",
      ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "expenses",
  }
);
module.exports = Expense;
