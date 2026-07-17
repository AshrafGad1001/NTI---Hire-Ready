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
        min: [0, "Salary cannot be negative"], // ما ينفعش المرتب يكون بالسالب
    },
    hireDate: {
        type: Date,
        default: Date.now, // لو ما حددش تاريخ التعيين، بيتحط تاريخ النهاردة
    },
    // ══ أمان/Audit: immutable: true ══
    // الحقل ده بيتسجل مرة واحدة بس لما الـ document يتعمل
    // بعد كده ما حدش يقدر يغيره — حتى الـ admin
    // ده عشان نحافظ على audit trail واضح: مين أنشأ السجل ده؟
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference للـ User model — بنقدر نعمل populate ونجيب بيانات اليوزر
        required: [true, "Creator user ID is required"],
        immutable: true,
    },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;