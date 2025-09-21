import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import VenueList from "./VenueList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const galleryImages = [
    "https://images.pexels.com/photos/3167521/pexels-photo-3167521.jpeg",
    "https://images.pexels.com/photos/17001763/pexels-photo-17001763.jpeg",
    "https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg",
    "https://images.pexels.com/photos/30584407/pexels-photo-30584407.jpeg",
    "https://images.pexels.com/photos/16120232/pexels-photo-16120232.jpeg",
    "https://images.pexels.com/photos/12876413/pexels-photo-12876413.jpeg",
    "https://images.pexels.com/photos/16985205/pexels-photo-16985205.jpeg",
    "https://images.pexels.com/photos/17931466/pexels-photo-17931466.jpeg",
  ];

  const hearts = Array.from({ length: 12 });
  const sparkles = Array.from({ length: 15 });

  const handleGetStarted = () => {
    navigate("/venues"); // ✅ Redirect to Venues page
  };

  return (
    <div
      className={`relative overflow-hidden w-full min-h-screen transition-colors duration-700 ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-pink-50 via-pink-100 to-yellow-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          alt="Wedding Ring"
          className="w-24 h-24 mb-6"
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {hearts.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500 text-2xl"
            initial={{ y: 300, x: Math.random() * 600 - 300, opacity: 0 }}
            animate={{ y: -200, opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          >
            ❤️
          </motion.div>
        ))}

        {sparkles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 text-xl"
            initial={{ y: Math.random() * 200, x: Math.random() * 600 - 300, opacity: 0 }}
            animate={{ y: Math.random() * -200, opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 4 + Math.random() * 2,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}

        <motion.h1
          className={`text-5xl md:text-6xl font-extrabold tracking-tight ${
            dark
              ? "text-pink-400"
              : "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-pink-500"
          }`}
          initial={{ opacity: 0, y: -60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Plan Your Dream Wedding 💍
        </motion.h1>

        <motion.p
          className={`mt-4 text-lg md:text-xl max-w-2xl leading-relaxed ${
            dark ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          Book the perfect venue, caterers, and decorators all in one place.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button
            onClick={handleGetStarted} // ✅ Added
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 hover:from-pink-600 hover:via-yellow-500 hover:to-pink-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Venues Section */}
      <section className="py-16 px-6 md:px-12 relative z-10">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            dark ? "text-pink-400" : "text-pink-700"
          }`}
        >
          Popular Venues
        </h2>
        <VenueList />
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6 md:px-12 relative z-10">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            dark ? "text-pink-400" : "text-pink-700"
          }`}
        >
          Wedding Memories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={img}
                alt={`Wedding ${i + 1}`}
                className="w-full h-72 object-cover rounded-3xl transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
