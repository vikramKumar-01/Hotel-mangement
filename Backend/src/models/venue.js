const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [String]
}, { timestamps: true });

module.exports = mongoose.models.Venue || mongoose.model("Venue", venueSchema);
