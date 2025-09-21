const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "MySuperSecretKey"; // Production me .env use karo

// ================= User Auth Middleware =================
const userAuth = async (req, res, next) => {
  try {
    // ✅ Cookie se token fetch karo
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Please login first!" });
    }

    // ✅ Token verify karo
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ DB se user fetch karo
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // ✅ User object request me attach karo
    req.user = user;
    next();
  } catch (err) {
    // Token invalid ya expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired. Please login again." });
    }
    res.status(400).json({ error: "Invalid token: " + err.message });
  }
};

// ================= Admin Auth Middleware =================
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied! Admins only." });
  }
  next();
};

module.exports = { userAuth, adminAuth };


