/** @format */

import React from "react";
import WeatherCard from "./WeatherCard"; 

export default function FavoriteCitiesDisplay({
  cityWeatherData,
  removeCityWeather,
}) {
  return (
    <>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Favorite Cities</h2>
      {Object.keys(cityWeatherData).length === 0 ? (
        <p className="mt-4 text-gray-500">No favorite cities added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {Object.keys(cityWeatherData).map((city) => (
            <div key={city} className="relative">
              <WeatherCard city={city} weather={cityWeatherData[city]} />
              <button
                onClick={() => removeCityWeather(city)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
