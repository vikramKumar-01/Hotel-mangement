import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import VenueCard from "./VenueCard";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const VenueList = () => {
  const { dark } = useTheme();
  const { role, loading: authLoading } = useAuth(); // ✅ auth context

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/venues/all");
        setVenues(res.data || []);
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError("Failed to load venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleDeleteVenueRequest = async (venueId) => {
    const ok = window.confirm("Are you sure you want to delete this venue?");
    if (!ok) return;

    try {
      await axiosInstance.delete(`/venues/delete/${venueId}`);
      setVenues((prev) => prev.filter((v) => v._id !== venueId));
    } catch (err) {
      console.error("Delete failed:", err?.response?.data || err?.message);
      alert(err?.response?.data?.error || "Failed to delete venue.");
    }
  };

  // ✅ Wait for auth + venues to load
  if (loading || authLoading || role === undefined) {
    return (
      <p className={`text-center mt-10 ${dark ? "text-gray-300" : "text-gray-600"}`}>
        Loading venues...
      </p>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Admin Add Button */}
      {role === "admin" && (
        <div className="flex justify-end mb-4">
          <Link to="/add-venue">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
              + Add Venue
            </button>
          </Link>
        </div>
      )}

      {/* Venue Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <VenueCard
              key={venue._id}
              venue={venue}
              dark={dark}
              isAdmin={role === "admin"} // ✅ correct admin flag
              onDeleteRequest={handleDeleteVenueRequest}
            />
          ))
        ) : (
          <p className={`text-center col-span-full ${dark ? "text-gray-300" : "text-gray-600"}`}>
            No venues found.
          </p>
        )}
      </div>
    </div>
  );
};

export default VenueList;
