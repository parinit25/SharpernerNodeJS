const express = require("express");
const router = express.Router();
const path = require("path");

const rootDir = require("../utils/path");
router.get("/add-product", (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "add-product.html"));
  // next();
});

router.post("/products", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
