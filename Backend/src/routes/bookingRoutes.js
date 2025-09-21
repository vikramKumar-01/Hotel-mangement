const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const { userAuth, adminAuth } = require("../middleware/authmiddleware");

// ---------------- User Books a Venue ----------------
router.post("/book", userAuth, async (req, res) => {
    try {
        const { venue, date, guests } = req.body;

        const booking = new Booking({
            user: req.user._id,
            venue,
            date,
            guests
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------- User Gets Their Bookings ----------------
router.get("/my-bookings", userAuth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate("venue", "name location price")
            .populate("user", "name email");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------- Admin Gets All Bookings ----------------
router.get("/allbooking", userAuth, adminAuth, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("venue", "name location price")
            .populate("user", "name email");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------- Admin Updates Booking Status ----------------
router.put("/:id/status", userAuth, adminAuth, async (req, res) => {
    try {
        const { status } = req.body; // approved / cancelled
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ error: "Booking not found" });

        booking.status = status;
        await booking.save();

        res.json({ message: "Booking status updated", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= Cancel Booking (Protected) =================
router.delete("/:id/cancel", userAuth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
