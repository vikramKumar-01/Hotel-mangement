const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { userAuth, adminAuth } = require("../middleware/authmiddleware"); // middleware import

const JWT_SECRET = "MySuperSecretKey";

// 🟢 Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Email check
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // 2️⃣ Role check
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can login here" });
    }

    // 3️⃣ Password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // 4️⃣ JWT generate
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    // 5️⃣ Cookie set
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // HTTPS me true
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 din
    });

    res.status(200).json({
      message: "Admin login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🟢 Admin Logout
router.post("/logout", (req, res) => {
  // cookie clear kar do
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.json({ message: "Logged out successfully" });
});

// 🟢 Get Admin Profile
router.get("/profile", userAuth, adminAuth, async (req, res) => {
  try {
    const admin = await User.findById(req.user._id).select("-password");
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Update Admin Profile
router.put("/profile/update", userAuth, adminAuth, async (req, res) => {
  try {
    const { name, password, profileImage, phone, address } = req.body;

    const admin = await User.findById(req.user._id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    // Update allowed fields
    if (name) admin.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }
    if (profileImage) admin.profileImage = profileImage;
    if (phone) admin.phone = phone;
    if (address) admin.address = address;

    // email aur role update nahi honge
    await admin.save();

    res.json({
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        profileImage: admin.profileImage,
        phone: admin.phone,
        address: admin.address
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
