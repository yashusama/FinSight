const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {

        // Get Authorization Header
        const authHeader = req.header("Authorization");

        // Check if header exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided.",
            });
        }

        // Extract Token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Store User Data
        req.user = verified;

        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            message: "Invalid Token",
        });

    }
};

module.exports = authMiddleware;