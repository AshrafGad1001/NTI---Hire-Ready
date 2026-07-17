const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Employee name is required"],
        trim: true,
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        trim: true,
    },
    department: {
        type: String,
        required: [true, "Department is required"],
        trim: true,
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
        min: [0, "Salary cannot be negative"], 
    },
    hireDate: {
        type: Date,
        default: Date.now, 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: [true, "Creator user ID is required"],
        immutable: true,
    },
});
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;