//Module Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

//My Imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactUsRoutes = require("./routes/contact");
const successRoutes = require("./routes/success");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/contact-us", contactUsRoutes);
app.use("/success", successRoutes);

app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
