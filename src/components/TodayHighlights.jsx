
import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function TodayHighlights({ weather }) {
  if (!weather) {
    return <p>No weather data available.</p>;
  }

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 rounded-lg mb-4">
      <h2 className="text-2xl text-start font-bold mb-4">Today's Highlights</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {/* Humidity Card */}
        <div className="bg-white p-4 rounded-lg flex flex-col items-center border border-gray-300">
          <h3 className="text-md text-gray-400 mb-2">Humidity</h3>
          <p className="text-lg font-bold">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white p-4 rounded-lg flex flex-col items-center border border-gray-300">
          <h3 className="text-md text-gray-400 mb-2">Wind Speed</h3>
          <p className="text-lg font-bold">{weather.wind.speed} m/s</p>
        </div>

        <div className="bg-white p-4 rounded-lg flex flex-col items-center border border-gray-300">
          <h3 className="text-md text-gray-400 mb-2">Sunrise & Sunset</h3>
          <div className="flex items-center">
            <FaArrowUp className="p-1 w-5 h-5 mx-1 text-white bg-purple-400 rounded-full" />
            <p className="text-lg font-bold mx-2"> {sunrise}</p>
            <FaArrowDown className="p-1 w-5 h-5 mx-1 text-white bg-purple-400 rounded-full" />
            <p className="text-lg font-bold mx-2"> {sunset} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
