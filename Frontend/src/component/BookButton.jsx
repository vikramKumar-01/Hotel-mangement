import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BookButton = ({ venueId }) => {
  const navigate = useNavigate();
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <button
        disabled
        className="px-6 py-2 bg-gray-300 text-black font-semibold rounded-lg cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  // Admin ko BookButton nahi dikhana
  if (role === "admin") return null;

  const handleClick = () => {
    if (!isAuthenticated) return navigate("/auth");
    if (role === "user") return navigate(`/book-now`);
  };

  const btnClass = isAuthenticated
    ? "bg-yellow-400 hover:bg-yellow-500 text-black"
    : "bg-gray-400 hover:bg-gray-500 text-white";
  const btnLabel = isAuthenticated ? "Book Now" : "Login to Book";

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 font-semibold rounded-lg transition shadow hover:shadow-lg ${btnClass}`}
    >
      {btnLabel}
    </button>
  );
};

export default BookButton;
