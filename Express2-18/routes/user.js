const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

router.post("/add-user", userControllers.createNewUser);
router.get("/", userControllers.getAllUser);
router.delete("/:userId", userControllers.deleteUserById);

module.exports = router;
