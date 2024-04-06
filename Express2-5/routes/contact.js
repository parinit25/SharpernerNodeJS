const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utils/path");

router.get("/", (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "contact-us.html"));
}),
  router.post("/", (req, res, next) => {
    const userDetails = req.body;
    console.log(req.body);
    res.redirect("/success");
  });

module.exports = router;
