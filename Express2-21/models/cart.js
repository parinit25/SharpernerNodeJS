const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: true, tableName: "carts" }
);

module.exports = Cart;
