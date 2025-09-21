import React from "react";

const Filter = ({ filter, setFilter, dark }) => {
  const handleChange = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });

  return (
    <div className="flex flex-wrap gap-4 justify-start mb-6">
      <select
        name="price"
        value={filter.price}
        onChange={handleChange}
        className={`px-4 py-2 rounded-lg border transition shadow-sm ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
      >
        <option value="">Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>

      <select
        name="capacity"
        value={filter.capacity}
        onChange={handleChange}
        className={`px-4 py-2 rounded-lg border transition shadow-sm ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
      >
        <option value="">Capacity</option>
        <option value="50">50+</option>
        <option value="100">100+</option>
        <option value="200">200+</option>
        <option value="500">500+</option>
      </select>

      <select
        name="location"
        value={filter.location}
        onChange={handleChange}
        className={`px-4 py-2 rounded-lg border transition shadow-sm ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
      >
        <option value="">Location</option>
        <option value="delhi">Delhi</option>
        <option value="mumbai">Mumbai</option>
        <option value="jaipur">Jaipur</option>
        <option value="kolkata">Kolkata</option>
      </select>
    </div>
  );
};

export default Filter;
