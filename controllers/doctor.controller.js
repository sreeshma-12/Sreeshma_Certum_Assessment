const Doctor = require("../models/doctor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

const generateToken = (userData) => {
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
    });
    return token;
};
exports.createDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctorExist = await Doctor.findOne({
            email: email,
        });
        if (doctorExist) {
            return res.status(200).send({ message: "You are already exists" });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            req.body.password = hashPassword;
            const newDoctor = await Doctor.create(req.body);
            return res
                .status(200)
                .send({ message: "Doctor created successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` });
    }
};
exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctorData = await Doctor.findOne({ email: email });
        if (!doctorData) {
            return res
                .status(400)
                .send({ message: "Incorrect email or password" });
        }
        const passwordMatch = bcrypt.compare(password, doctorData.password);
        if (passwordMatch) {
            const token = generateToken(doctorData);
            sendToken(token, res);
        } else {
            res.status(400).send({ message: "Incorrect email or password" });
        }
    } catch (error) {
        res.status(500).send({ message: `${error.message}` });
    }
};
