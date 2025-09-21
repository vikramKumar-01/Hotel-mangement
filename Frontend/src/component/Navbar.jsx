import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { dark, toggleDarkMode } = useTheme();
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null;

  const renderLinks = () => {
    if (!isAuthenticated) {
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/auth"
            className="relative inline-block px-6 py-2 font-semibold text-black bg-yellow-400 rounded-full hover:bg-yellow-500 transition"
          >
            Login / Signup
          </Link>
        </motion.div>
      );
    }

    return (
      <>
        <Link to="/profile" className="hover:text-yellow-400 transition">
          Profile
        </Link>

        {role === "admin" && (
          <Link to="/all-bookings" className="hover:text-yellow-400 transition">
            All Bookings
          </Link>
        )}

        {role === "user" && (
          <Link to="/my-bookings" className="hover:text-yellow-400 transition">
            My Bookings
          </Link>
        )}

        <Logout />
      </>
    );
  };

  return (
    <nav
      className={`${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } fixed w-full shadow-md z-50 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="text-2xl font-bold">
          <Link to="/">HotelBooking</Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/venues" className="hover:text-yellow-400 transition">
            Venues
          </Link>
          {renderLinks()}
          <button onClick={toggleDarkMode} className="ml-4 text-xl">
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleDarkMode} className="mr-4 text-xl">
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="text-2xl"
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {navOpen && (
        <div
          className={`${
            dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          } md:hidden px-6 py-4 flex flex-col space-y-4 shadow-lg transition-colors`}
        >
          <Link
            to="/"
            onClick={() => setNavOpen(false)}
            className="hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            to="/venues"
            onClick={() => setNavOpen(false)}
            className="hover:text-yellow-400"
          >
            Venues
          </Link>
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
