const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/add-product", (req, res, next) => {
  res.send(
    `<html>
       <head>
         <title>Add product page</title>
       </head>
       <body>
         <h3>Enter the product Title</h3>
         <form action='/products' method="POST">
            <label name="title"> Product Title</label>
            <input type="text" name="title" id="title"/> 
            <br/>
            <label name="size"> Product Size </label >
            <input type="text" name="size" id="size" />
            <br />
            <button type="submit">Add product</button>
         </form>
        </body>
    </html>`
  );
  // next();
});

app.post("/products", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("In the another middleware");
  res.send("<h1>Hello World !!</h1>");
});

app.listen(3000);
