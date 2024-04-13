const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItems");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Products and users
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
// User and Cart
User.hasOne(Cart);
Cart.belongsTo(User);
// Cart and Products - Many To Many
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
// app.use(errorController.get404);

async function initializeServer() {
  try {
    await sequelize.sync();
    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({
        name: "Parinit Singh",
        emailId: "parinit.singh06@gmail.com",
      });
    }
    await user.createCart();
    // console.log(user);
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
}

initializeServer();
