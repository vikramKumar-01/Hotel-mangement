import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import BookButton from "./BookButton";

const VenueCard = ({ venue, dark, onDeleteRequest, isAdmin = false }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (venue.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % venue.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [venue.images]);

  const nextImage = () => {
    if (venue.images?.length > 1)
      setCurrentImg((prev) => (prev + 1) % venue.images.length);
  };
  const prevImage = () => {
    if (venue.images?.length > 1)
      setCurrentImg((prev) => (prev === 0 ? venue.images.length - 1 : prev - 1));
  };

  const handleDeleteClick = async () => {
    if (!onDeleteRequest) return;
    try {
      setDeleting(true);
      await onDeleteRequest(venue._id);
    } finally {
      setDeleting(false);
    }
  };

  const imageUrl =
    venue.images?.length > 0 && venue.images[currentImg]?.trim() !== ""
      ? venue.images[currentImg]
      : "https://dummyimage.com/400x200/cccccc/000000&text=No+Image";

  return (
    <motion.div
      className={`relative flex flex-col rounded-xl shadow-lg transition-transform transform hover:-translate-y-2 ${
        dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Image Slider */}
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={imageUrl}
            src={imageUrl}
            alt={venue.name}
            className="w-full h-48 object-cover rounded-t-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>

        {venue.images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 text-white p-1 rounded-full hover:bg-black/40 transition"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 text-white p-1 rounded-full hover:bg-black/40 transition"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Venue Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-xl mb-2">{venue.name}</h3>
        <p className="text-yellow-500 font-semibold mb-1 text-lg">Price: {venue.price}</p>
        <p className={`${dark ? "text-gray-300" : "text-gray-700"} mb-1`}>Capacity: {venue.capacity}</p>
        <p className={`${dark ? "text-gray-300" : "text-gray-700"} mb-2`}>Location: {venue.location}</p>
        <p className={`${dark ? "text-gray-400" : "text-gray-600"} text-sm flex-1 overflow-y-auto`}>
          {venue.description || "No description available."}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex gap-4 justify-center">
          {isAdmin ? (
            <>
              <Link to={`/edit-venue/${venue._id}`}>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDeleteClick}
                disabled={deleting}
                className={`px-6 py-2 ${deleting ? "bg-red-400" : "bg-red-600 hover:bg-red-700"} text-white font-semibold rounded-lg transition`}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          ) : (
            <BookButton venueId={venue._id} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VenueCard;
