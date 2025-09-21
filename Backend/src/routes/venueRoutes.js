const express = require("express");
const Venue = require("../models/venue");
const { userAuth } = require("../middleware/authmiddleware");
const { adminAuth } = require("../middleware/adminmiddleware");

const router = express.Router();

// ================== Admin APIs ==================

// Add Venue (Admin Only - Login Required)
router.post("/add", userAuth, adminAuth, async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json({ message: "Venue added successfully", venue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Venue (Admin Only - Login Required)
router.put("/update/:id", userAuth, adminAuth, async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // ✅ isse updated document return hoga
    );
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    res.json({ message: "Venue updated successfully", venue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete Venue (Admin Only - Login Required)
router.delete("/delete/:id", userAuth, adminAuth, async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== Public User APIs ==================

// Get All Venues (No Login Required)
router.get("/all", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Venues with filter and sort (No Login Required)

router.get("/filter", async (req, res) => {
  try {
    const { price, capacity, location } = req.query;

    let filter = {};

    // Location filter - case-insensitive and partial match
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Capacity filter - numeric comparison
    if (capacity) {
      filter.capacity = { $gte: Number(capacity) };
    }

    // Build query
    let query = Venue.find(filter);

    // Price sorting
    if (price === "low") query = query.sort({ price: 1 });
    if (price === "high") query = query.sort({ price: -1 });

    const venues = await query;
    res.json(venues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get Single Venue (No Login Required)
router.get("/one/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
