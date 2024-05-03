const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const express = require("express");
const app = express();
const port = process.env.PORT;
const cookie = require("cookie-parser");
const connectDB = require("./config/database");
connectDB();
app.use(express.json());
app.use(cookie());

const user_route = require("./routes/user.route");
const doctor_route = require("./routes/doctor.route");
const appointment_route = require("./routes/appointment.route");
app.use("/api", user_route);
app.use("/api", doctor_route);
app.use("/api", appointment_route);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
