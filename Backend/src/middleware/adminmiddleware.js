const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET =process.env.JWT_SECRET;

const adminAuth = async (req, res, next) => {
  try {
    // ✅ Sirf cookie se token le rahe hain
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Please login first!" });
    }

    // ✅ Token verify karo
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ User fetch karo
    const user = await User.findById(decoded._id || decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // ✅ Role check
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // ✅ User object request me attach karo
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token: " + err.message });
  }
};

module.exports = { adminAuth };
