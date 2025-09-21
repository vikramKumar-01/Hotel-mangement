// src/pages/AddVenue.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const AddVenue = () => {
  const [venue, setVenue] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    description: "",
    images: [""],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dark } = useTheme();

  // 🔹 Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue({ ...venue, [name]: value });
  };

  // 🔹 Image change
  const handleImageChange = (index, value) => {
    const newImages = [...venue.images];
    newImages[index] = value;
    setVenue({ ...venue, images: newImages });
  };

  const addImageField = () => {
    setVenue({ ...venue, images: [...venue.images, ""] });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/venues/add",
        venue,
        { withCredentials: true }
      );
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.error("Error adding venue:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding venue");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Common input classes (dark + light)
  const inputClass = `w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
    ${dark
      ? "bg-gray-700 text-white placeholder-gray-300 border-gray-600"
      : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"}`;

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center px-4 py-10 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`w-full max-w-3xl rounded-2xl shadow-xl p-8 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          ➕ Add New Venue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="name"
            value={venue.name}
            onChange={handleChange}
            placeholder="Venue Name"
            className={inputClass}
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="location"
            value={venue.location}
            onChange={handleChange}
            placeholder="Location"
            className={inputClass}
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            name="capacity"
            value={venue.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            className={inputClass}
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            name="price"
            value={venue.price}
            onChange={handleChange}
            placeholder="Price"
            className={inputClass}
            required
          />

          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="description"
            value={venue.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className={inputClass}
          />

          {/* Images */}
          <div>
            <label className="block font-semibold mb-2">Images URLs</label>
            {venue.images.map((img, i) => (
              <motion.input
                whileFocus={{ scale: 1.02 }}
                key={i}
                type="text"
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                placeholder={`Image URL ${i + 1}`}
                className={`${inputClass} mb-2`}
              />
            ))}
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={addImageField}
              className={`px-4 py-2 rounded-lg ${
                dark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              ➕ Add More Images
            </motion.button>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Venue"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddVenue;
