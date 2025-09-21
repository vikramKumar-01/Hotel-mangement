import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; // ✅ auth
import FilterComponent from "./Filter";
import VenueCard from "./VenueCard";
import { motion } from "framer-motion";

const Venues = () => {
  const { dark } = useTheme();
  const { role, loading: authLoading } = useAuth(); // ✅ role + auth loading

  const [filter, setFilter] = useState({ price: "", capacity: "", location: "" });
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const params = {};
        if (filter.price) params.price = filter.price;
        if (filter.capacity) params.capacity = filter.capacity;
        if (filter.location) params.location = filter.location;

        const res = await axios.get("http://localhost:3000/venues/filter", { params });

        if (!res.data || res.data.length === 0) setNotFound(true);
        else setVenues(res.data);
      } catch (err) {
        console.error("Error fetching venues:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [filter]);

  // ✅ Wait for auth to load
  if (authLoading) {
    return (
      <p className="text-center mt-8 text-lg">
        Loading venues...
      </p>
    );
  }

  return (
    <div
      className={`min-h-screen pb-10 transition-colors duration-500 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-4 md:mt-6">
          <FilterComponent filter={filter} setFilter={setFilter} dark={dark} />
        </div>

        {loading ? (
          <p className="text-center mt-8 text-lg">Loading venues...</p>
        ) : notFound ? (
          <p className="text-center mt-8 text-red-500 font-semibold text-lg">
            No venues match your filters. Try adjusting capacity or location.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {venues.map((venue) => (
              <VenueCard
                key={venue._id}
                venue={venue}
                dark={dark}
                isAdmin={role === "admin"} // ✅ admin flag
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Venues;
