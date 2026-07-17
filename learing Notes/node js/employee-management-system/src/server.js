require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./modules/Auth/auth.route");
const userRoutes = require("./modules/User/user.route");
const employeeRoutes = require("./modules/Employee/employee.route");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(",")
    : ["http://localhost:3000"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use("/api/auth", authRoutes);     
app.use("/api/users", userRoutes);      
app.use("/api/employees", employeeRoutes); 
app.get("/", (_req, res) => {
    res.json({ status: "ok", message: "Employee Management System API" });
});
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});
app.use(errorHandler);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});