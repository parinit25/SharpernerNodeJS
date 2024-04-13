const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    console.log(productId);
    const result = await Product.findByPk(productId);
    res.render("shop/product-detail", {
      product: result,
      pageTitle: result.title,
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res, next) => {
  let fetchedCart;
  let newQuantity = 1;
  try {
    const prodId = req.body.productId;
    fetchedCart = await req.user.getCart();

    // Check if the product already exists in the cart
    const products = await fetchedCart.getProducts({
      where: { productId: prodId },
    });
    let product;
    if (products.length > 0) {
      product = products[0];
    }

    if (product) {
      // Implement logic to update the quantity of an existing product in the cart
      newQuantity = product.cartItem.quantity + 1;
      await fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    } else {
      // If the product doesn't exist in the cart, add it
      const productNew = await Product.findByPk(prodId);
      await fetchedCart.addProduct(productNew, {
        through: { quantity: newQuantity },
      });
    }
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { productId: prodId } });
    
    if (products.length === 0) {
      // Product not found in the cart, handle accordingly (e.g., return an error message)
      return res.status(404).send("Product not found in the cart.");
    }
    
    const product = products[0];
    await product.cartItem.destroy();
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};


exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
