const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");

exports.doctorAuthorization = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).send({ message: "Please login to your account" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.doctor_id = decode.id;
        next();
    } catch (error) {
        res.status(500).send({ message: `${error.message}` });
    }
};

exports.authorizationRoles = async (req, res, next) => {
    try {
        const doctorData = await Doctor.findById(req.doctor_id);

        if (doctorData.role !== "doctor") {
            res.status(400).send({
                message: "This URL only have access to doctor",
            });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: `${error.message}` });
    }
};
