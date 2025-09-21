import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => setDark(prev => !prev);

  // Body background update
  useEffect(() => {
    document.body.className = dark ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
