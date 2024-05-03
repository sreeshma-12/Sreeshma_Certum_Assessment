const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

const generateToken = (userData) => {
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
    });
    return token;
};

exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({
            email: email,
        });
        if (userExist) {
            return res.status(200).send({ message: "You are already exists" });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            req.body.password = hashPassword;
            const newUser = await User.create(req.body);
            return res
                .status(200)
                .send({ message: "User created successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res
                .status(400)
                .send({ message: "Incorrect email or password" });
        }
        const passwordMatch = bcrypt.compare(password, userData.password);
        if (passwordMatch) {
            const token = generateToken(userData);

            sendToken(token, res);
        } else {
            res.status(400).send({ message: "Incorrect email or password" });
        }
    } catch (error) {
        res.status(500).send({ message: `${error.message}` });
    }
};
