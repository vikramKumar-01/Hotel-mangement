// src/components/LogoutButton.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser(); // single call via context
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading} className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default Logout;
