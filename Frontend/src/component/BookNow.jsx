import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const BookNow = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [selectedVenuePrice, setSelectedVenuePrice] = useState(0);
  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    guests: 1,
    requirements: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("http://localhost:3000/venues/all");
        const venueData = res.data;
        setVenues(venueData);

        if (venueData.length > 0) {
          setFormData((prev) => ({ ...prev, venue: venueData[0]._id }));
          setSelectedVenuePrice(venueData[0].price);
        }
      } catch (err) {
        console.error("Error fetching venues:", err);
        toast.error("Failed to load venues");
      }
    };
    fetchVenues();
  }, []);

  const handleVenueChange = (e) => {
    const selectedId = e.target.value;
    const selectedVenue = venues.find((v) => v._id === selectedId);
    setSelectedVenuePrice(selectedVenue?.price || 0);
    setFormData({ ...formData, venue: selectedId });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // agar token use ho raha hai
      const res = await axios.post(
        "http://localhost:3000/booking/book",
        {
          venue: formData.venue,
          date: formData.date,
          guests: formData.guests,
          requirements: formData.requirements,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success("Booking created successfully!");

      // Payment page pe navigate kare, saath me price bhej rahe hain
      navigate("/payment", { state: { ...formData, price: selectedVenuePrice } });
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center p-4 transition-colors ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <motion.form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg p-6 rounded-2xl shadow-2xl space-y-4 transition-colors ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center">Book Venue</h2>

        {/* Venue Dropdown */}
        <label className="block">
          <span className={`text-gray-700 dark:text-gray-300`}>Select Venue</span>
          <select
            name="venue"
            value={formData.venue}
            onChange={handleVenueChange}
            required
            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100 text-gray-900"}`}
          >
            {venues.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name} - {v.location}
              </option>
            ))}
          </select>
        </label>

        {/* Price */}
        <p className="text-right font-semibold text-yellow-500">
          Price: ₹{selectedVenuePrice}
        </p>

        {/* Date */}
        <label className="block">
          <span className={`text-gray-700 dark:text-gray-300`}>Date</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100 text-gray-900"}`}
          />
        </label>

        {/* Guests */}
        <label className="block">
          <span className={`text-gray-700 dark:text-gray-300`}>Guests</span>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            min={1}
            onChange={handleChange}
            required
            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100 text-gray-900"}`}
          />
        </label>

        {/* Requirements */}
        <label className="block">
          <span className={`text-gray-700 dark:text-gray-300`}>Special Requirements</span>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Optional"
            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100 text-gray-900"}`}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition transform hover:scale-105"
        >
          {loading ? "Loading..." : "Proceed to Payment"}
        </button>
      </motion.form>
    </div>
  );
};

export default BookNow;
