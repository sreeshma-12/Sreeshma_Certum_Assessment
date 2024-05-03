const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.userAuthorization = async (req, res, next) => {
    try {
        console.log("TOKEN", token);
        const { token } = res.cookies;

        if (!token) {
            return res.status(400).send({ message: "please login" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // const req.user_id  = decode.id
        next();
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` });
    }
};
