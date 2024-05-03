const express = require("express");
const {
    createAppointment,
    getAllAppointments,
    doctorWithAppointments,
} = require("../controllers/appointment.controller");
const {
    doctorAuthorization,
    authorizationRoles,
} = require("../middleware/docAuth");

const router = express();

router
    .route("/doctor/appointment")
    .post(doctorAuthorization, authorizationRoles, createAppointment)
    .get(getAllAppointments);
router.route("/doctors/appointments").get(doctorWithAppointments);
module.exports = router;
