const errorHandler = (err, req, res, next) => {

    if (process.env.NODE_ENV === "development") {
        console.error("Error:", err);
    }

    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: messages,
        });
    }


    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            message: `A record with this ${field} already exists`,
        });
    }


    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }


    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token has expired",
        });
    }


    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message:
            process.env.NODE_ENV === "production"
                ? "Something went wrong. Please try again later."
                : err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;