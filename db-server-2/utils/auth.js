const jwt = require("jsonwebtoken");
const User = require("../models/user");
const logger = require("../logger");
require("dotenv").config();

const { JWT_SECRET } = process.env; 

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      logger.warn("No token provided in the request");
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    if (!authHeader.startsWith("Bearer ")) {
      logger.warn("Token format is invalid");
      return res.status(400).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("Token received:", token);

    const decoded = jwt.verify(token, JWT_SECRET); 
    // console.log("DB1 decoded: ", decoded, "  ", JWT_SECRET);

    if (!decoded || !decoded.userId) {
      logger.error("Decoded token does not contain userId");
      return res.status(400).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      logger.warn(`User not found for token userId: ${decoded.userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};

module.exports = { authenticate };


exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
