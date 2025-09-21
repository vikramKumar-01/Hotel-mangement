// src/pages/EditVenue.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const EditVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dark } = useTheme();

  // Fetch venue
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/venues/one/${id}`, {
          withCredentials: true,
        });
        setVenue({
          ...res.data,
          // Convert array to comma-separated string for input
          images: Array.isArray(res.data.images) ? res.data.images.join(", ") : "",
        });
      } catch (err) {
        toast.error("Failed to load venue");
      }
    };
    fetchVenue();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert comma-separated string to array before sending to backend
      const payload = {
        ...venue,
        price: Number(venue.price),
        capacity: Number(venue.capacity),
        images: venue.images
          ? venue.images.split(",").map((img) => img.trim()).filter((img) => img !== "")
          : [],
      };

      await axios.put(
        `http://localhost:3000/venues/update/${id}`,
        payload,
        { withCredentials: true }
      );

      toast.success("Venue updated successfully!");
      navigate(`/venues/one/${id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!venue) {
    return <p className={`text-center mt-10 ${dark ? "text-gray-300" : "text-gray-600"}`}>Loading venue...</p>;
  }

  return (
    <div className={`max-w-2xl mx-auto mt-10 p-8 rounded-2xl shadow-lg border transition ${dark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${dark ? "text-yellow-400" : "text-yellow-500"}`}>✏️ Edit Venue</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className={`block mb-1 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Name</label>
          <input
            type="text"
            name="name"
            value={venue.name}
            onChange={handleChange}
            placeholder="Venue name"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          />
        </div>

        {/* Location */}
        <div>
          <label className={`block mb-1 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Location</label>
          <input
            type="text"
            name="location"
            value={venue.location}
            onChange={handleChange}
            placeholder="Venue location"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          />
        </div>

        {/* Capacity */}
        <div>
          <label className={`block mb-1 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={venue.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          />
        </div>

        {/* Price */}
        <div>
          <label className={`block mb-1 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Price</label>
          <input
            type="number"
            name="price"
            value={venue.price}
            onChange={handleChange}
            placeholder="Price"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          />
        </div>

        {/* Description */}
        <div>
          <label className={`block mb-1 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Description</label>
          <textarea
            name="description"
            value={venue.description}
            onChange={handleChange}
            placeholder="Enter venue description"
            rows="3"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          />
        </div>

        {/* Images */}
        <div>
          <label className={`block mb-1 font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Images (comma separated URLs)</label>
          <input
            type="text"
            name="images"
            value={venue.images}
            onChange={handleChange}
            placeholder="e.g. https://image1.jpg, https://image2.jpg"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-bold rounded-lg shadow-md transition transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed ${dark ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-yellow-400 hover:bg-yellow-500 text-black"}`}
        >
          {loading ? "Updating..." : "💾 Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditVenue;
