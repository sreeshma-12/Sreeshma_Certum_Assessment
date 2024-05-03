const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");
const router = express();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
module.exports = router;
