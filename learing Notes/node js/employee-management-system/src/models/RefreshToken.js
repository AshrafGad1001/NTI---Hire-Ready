const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({

    tokenHash: {
        type: String,
        required: [true, "Token hash is required"],
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
    },

    deviceInfo: {
        type: String,
        default: "Unknown",
    },
    expiresAt: {
        type: Date,
        required: [true, "Expiration date is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    isRevoked: {
        type: Boolean,
        default: false,
    },
});


refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
module.exports = RefreshToken;