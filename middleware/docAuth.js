const jwt = require("jsonwebtoken");
const doctorAuthorization = async (req, res, next) => {
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
module.exports = doctorAuthorization;
