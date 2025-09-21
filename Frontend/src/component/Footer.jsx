import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { dark } = useTheme();

  return (
    <footer
      className={`${
        dark ? "bg-gray-900 text-white" : "bg-gray-500 text-gray-100"
      } py-6 transition-colors w-full`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2025 HotelBooking. All rights reserved.</p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mt-2 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-yellow-400">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-yellow-400">
            Terms & Conditions
          </Link>
          <Link to="/refund-policy" className="hover:text-yellow-400">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
