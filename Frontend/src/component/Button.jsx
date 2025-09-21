import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-lg rounded-full shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
