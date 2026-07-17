const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name is required"]
    },
    slag: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "email is required"]
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required"]
    }
    ,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;