const Appointments = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");

exports.createAppointment = async (req, res) => {
    try {
        const { date, start_time, end_time } = req.body;
        const existingAppointment = await Appointments.findOne({
            date,
            start_time,
            end_time,
        });
        if (existingAppointment) {
            return res.status(400).send({
                message: "This appointment date and time already scheduled",
            });
        }
        const appSave = await Appointments.create(req.body);

        if (appSave) {
            const doctor = await Doctor.findById(req.doctor_id);
            doctor.appointments.push(appSave.id);
            doctor.save();
            res.status(200).send({
                message: "Appointment created successfully",
            });
        }
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointments.find();
        if (appointments) {
            const appointmentData = appointments.filter((data) => {
                return data._id.toString() !== req.appointment_id;
            });

            return res.status(200).send({
                message: "All users found",
                data: appointmentData,
            });
        } else {
            res.status(400).send({ message: "No users found" });
        }
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` });
    }
};
exports.doctorWithAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.find();

        if (!doctor) {
            return res.status(400).send({ message: "No doctors found" });
        }

        const temp = await Promise.all(
            doctor.map(async (data) => {
                if (data.appointments.length >= 1) {
                    const updatedAppointments = [];
                    for (const appointmentId of data.appointments) {
                        const app = await Appointments.findById(appointmentId);
                        if (app) {
                            updatedAppointments.push(app);
                        }
                    }
                    // Replace the appointments array with the updated one
                    data.appointments = updatedAppointments;
                    // Save the updated doctor data if needed
                }
                return data;
            })
        );
        console.log("TEMP", temp);
        return res
            .status(200)
            .send({ message: "All appointments found", data: temp });
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` });
    }
};
