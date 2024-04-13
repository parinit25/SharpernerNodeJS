const User = require("../models/user");

exports.createNewUser = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  User.create({
    username,
    email,
    phoneNumber,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllUser = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      user.destroy();
      res.status(200).send("User Removed Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
