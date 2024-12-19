const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "supersecret";

module.exports = {
  createToken: (payload) => jwt.sign(payload, SECRET, { expiresIn: "1h" }),
  verifyToken: (token) => jwt.verify(token, SECRET),
};
