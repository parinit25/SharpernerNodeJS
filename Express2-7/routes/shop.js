const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getAllproducts);

module.exports = router;
