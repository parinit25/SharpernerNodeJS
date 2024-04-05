const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.status(200).send(
    `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Add product page</title>
    </head>
    <body>
        <h3>Enter the product Title</h3>
        <form action='/admin/products' method="POST">
            <label for="title">Product Title</label>
            <input type="text" name="title" id="title" required> 
            <br>
            <label for="size">Product Size</label>
            <input type="text" name="size" id="size" required>
            <br>
            <button type="submit">Add product</button>
        </form>
    </body>
    </html>
    `
  );
  // next();
});

router.post("/products", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
