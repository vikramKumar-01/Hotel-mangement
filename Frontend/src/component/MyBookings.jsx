import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const MyBookings = () => {
  const { dark } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/booking/my-bookings", { withCredentials: true });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`http://localhost:3000/booking/${id.trim()}/cancel`, { withCredentials: true });
      setBookings(bookings.map(b => b._id === id ? { ...b, status: "cancelled" } : b));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className={`text-center mt-20 text-lg font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Loading your bookings...</p>;
  }

  return (
    <div className={`min-h-screen pt-24 px-4 md:px-12 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <h1 className={`text-3xl font-bold mb-8 text-center ${dark ? "text-white" : "text-gray-900"}`}>My Bookings</h1>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-3">
        {["all", "pending", "approved", "cancelled"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm ${
              filter === tab
                ? "bg-yellow-400 text-black"
                : dark
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredBookings.map(booking => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-2xl shadow-lg transition hover:shadow-2xl flex flex-col justify-between ${
                dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              {/* Venue Info */}
              <div className="space-y-2">
                <h2 className="font-bold text-xl">{booking.venue?.name || "Venue not available"}</h2>
                <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>Location: {booking.venue?.location || "-"}</p>
                <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>Calendar: {booking.date ? new Date(booking.date).toLocaleDateString() : "-"}</p>
                <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>Guests: {booking.guests || "-"}</p>
                <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>Price: ₹{booking.venue?.price || "-"}</p>
              </div>

              {/* Status + Action */}
              <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : booking.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                }`}>
                  {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                </span>

                {booking.status !== "cancelled" ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(booking._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold shadow w-full sm:w-auto"
                  >
                    Cancel Booking
                  </motion.button>
                ) : (
                  <p className="text-red-500 font-semibold text-sm">Already Cancelled</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <p className={`text-center mt-12 text-lg ${dark ? "text-gray-300" : "text-gray-500"}`}>
          No bookings in this category.
        </p>
      )}
    </div>
  );
};

export default MyBookings;
