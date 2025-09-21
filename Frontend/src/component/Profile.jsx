import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import moment from "moment";

const Profile = () => {
  const { dark } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", { withCredentials: true });
        setUserData(res.data);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          address: res.data.address || ""
        });
        setPreviewImage(res.data.profileImage || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      if (selectedImage) data.append("profileImage", selectedImage);

      const res = await axios.put("http://localhost:3000/user/profile/update", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUserData(res.data.user);
      setPreviewImage(
        res.data.user.profileImage
          ? res.data.user.profileImage
          : "https://via.placeholder.com/120x120?text=Profile"
      );

      setEditMode(false);
      setSelectedImage(null);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div
      className={`min-h-screen flex justify-center pt-20 px-4 pb-10 transition-colors ${
        dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div
        className={`w-full max-w-lg p-8 rounded-2xl shadow-2xl transition-all duration-500 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Role Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">
          {userData.role === "admin" ? "👑 Admin Profile" : "🙍 User Profile"}
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={previewImage || "https://via.placeholder.com/120x120?text=Profile"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover shadow-md mb-3"
          />
          {editMode && (
            <label className="px-4 py-2 bg-yellow-400 text-black rounded-lg cursor-pointer hover:bg-yellow-500 transition font-semibold">
              Change Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-3 text-center">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400 ${
                  dark
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-100 text-gray-900"
                }`}
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400 ${
                  dark
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-100 text-gray-900"
                }`}
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400 ${
                  dark
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-100 text-gray-900"
                }`}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-gray-400">{userData.email}</p>
              <p className="text-gray-400">{userData.phone || "-"}</p>
              <p className="text-gray-400">{userData.address || "-"}</p>
            </>
          )}
          <p className="text-sm text-gray-500">
            Last Updated: {moment(userData.updatedAt).format("MMMM Do YYYY, h:mm A")}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
