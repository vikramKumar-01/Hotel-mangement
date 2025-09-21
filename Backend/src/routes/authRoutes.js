const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { userAuth } = require("../middleware/authmiddleware");
const upload = require("../middleware/upload"); // ✅ sirf middleware wala upload use karna

const router = express.Router();
const JWT_SECRET = "MySuperSecretKey"; // Hardcoded secret (production me .env use karna)

// ================= Register =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = new User({ name, email, password, role }); // password hash model me already
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= Login =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,    // JavaScript se accessible nahi hoga
      secure: false,     // production (https) me true karna
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= Profile (protected) =================
router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= Update Profile (protected) =================
router.put("/profile/update", userAuth, upload.single("profileImage"), async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      user.profileImage = `http://localhost:3000/uploads/${req.file.filename}`;
    }


    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || "",
        phone: user.phone,
        address: user.address
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ================= Logout =================
router.post("/logout", userAuth, (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
