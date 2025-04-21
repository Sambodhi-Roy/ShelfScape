const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer token

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ valid: false, message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
