const fs = require("fs");
const path = require("path");
const Cart = require("../models/cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((item) => item.id === id);
      cb(product);
    });
  }
  static deleteById(id, cb) {
    console.log(id)
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((item) => item.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id,product.price);
          cb(true); 
        } else {
          cb(false); 
        }
      });
    });
  }
};
