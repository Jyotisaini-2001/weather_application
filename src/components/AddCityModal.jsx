// src/components/AddCityModal.js
import React, { useState } from "react";

const AddCityModal = ({ isOpen, onClose, addCityWeather }) => {
  const [city, setCity] = useState("");

  const handleAddCity = () => {
    if (city) {
      addCityWeather(city);
      setCity("");
      onClose(); 
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-1/3">
          <h2 className="text-lg font-bold mb-4">Add New City</h2>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleAddCity}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Add City
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddCityModal;
