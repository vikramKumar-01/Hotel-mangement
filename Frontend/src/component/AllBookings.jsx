// src/components/AllBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-hot-toast";

const AllBookings = () => {
  const { dark } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/booking/allbooking", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/booking/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: newStatus } : b
        )
      );

      toast.success("Booking status updated!");
    } catch (err) {
      console.error("Failed to update status:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg">
        Loading bookings...
      </p>
    );

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-lg">No bookings found.</p>
      ) : (
        <>
          {/* Large screens: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className={`w-full border-collapse rounded-lg ${dark ? "border-gray-700" : "border-gray-300"}`}>
              <thead className={`${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
                <tr>
                  <th className="py-2 px-4 border-b">User</th>
                  <th className="py-2 px-4 border-b">Venue</th>
                  <th className="py-2 px-4 border-b">Location</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Guests</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className={`${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} hover:bg-yellow-100 transition`}
                  >
                    <td className="py-2 px-4 border-b">{booking.user?.name}</td>
                    <td className="py-2 px-4 border-b">{booking.venue?.name}</td>
                    <td className="py-2 px-4 border-b">{booking.venue?.location}</td>
                    <td className="py-2 px-4 border-b">{formatDate(booking.date)}</td>
                    <td className="py-2 px-4 border-b">{booking.guests}</td>
                    <td className="py-2 px-4 border-b">₹{booking.venue?.price ?? "N/A"}</td>
                    <td className="py-2 px-4 border-b capitalize">{booking.status}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={booking.status || "pending"}
                        onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                        disabled={updatingId === booking._id}
                        className={`px-2 py-1 rounded w-full ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100 text-gray-900"}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screens: Cards */}
          <div className="md:hidden grid gap-4">
            {bookings.map((booking) => (
              <div key={booking._id} className={`p-4 rounded-lg shadow-md ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                <h3 className="font-bold text-lg">{booking.venue?.name ?? "Unknown Venue"}</h3>
                <p><span className="font-semibold">Location:</span> {booking.venue?.location ?? "N/A"}</p>
                <p><span className="font-semibold">Date:</span> {formatDate(booking.date)}</p>
                <p><span className="font-semibold">Guests:</span> {booking.guests}</p>
                <p><span className="font-semibold">Price:</span> ₹{booking.venue?.price ?? "N/A"}</p>
                <p><span className="font-semibold">Status:</span> <span className="capitalize">{booking.status}</span></p>
                <select
                  value={booking.status || "pending"}
                  onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                  disabled={updatingId === booking._id}
                  className={`mt-2 px-2 py-1 rounded w-full ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100 text-gray-900"}`}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllBookings;
