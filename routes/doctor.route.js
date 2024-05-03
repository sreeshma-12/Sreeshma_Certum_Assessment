const express = require("express");
const {
    createDoctor,
    loginDoctor,
} = require("../controllers/doctor.controller");
const router = express();

router.route("/doctor/signup").post(createDoctor);
router.route("/doctor/login").post(loginDoctor);
module.exports = router;
