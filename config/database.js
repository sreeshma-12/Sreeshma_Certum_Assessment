const mongoose = require("mongoose");
const connectDB = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((data) => {
            console.log("Connected to database", data.connection.host);
        })
        .catch((error) => {
            console.log("database error");
        });
};
module.exports = connectDB;
