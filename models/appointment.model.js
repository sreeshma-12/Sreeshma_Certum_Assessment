const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
});
const Appointments = mongoose.model("Appointments", appointmentSchema);
module.exports = Appointments;
