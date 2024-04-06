const path = require("path");
const rootDir = require("../utils/path");

exports.postUserDetails = (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "contact-us.html"));
};
exports.userDetailsSaved = (req, res, next) => {
  const userDetails = req.body;
  console.log(req.body);
  res.redirect("/success");
};
exports.userDetailsSuccess = (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "success.html"));
};
