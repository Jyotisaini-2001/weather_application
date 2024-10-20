/** @format */

// src/components/WeatherDisplay.js

import React, { useState } from "react";
import ForecastDisplay from "./ForecastDisplay";
import TodayHighlights from "./TodayHighlights";
import FavoriteCities from "./FavoriteCities";
import AddCityModal from "./AddCityModal";

export default function WeatherDisplay({ weather, forecast }) {
  const [cityWeatherData, setCityWeatherData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const now = new Date();
  const options = { weekday: "long" };
  const day = now.toLocaleDateString(undefined, options);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${String(minutes).padStart(
    2,
    "0"
  )} ${ampm}`;

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  // Function to get the temperature based on the unit
  const getTemperature = (temp) => {
    return isCelsius ? temp.toFixed(0) : ((temp * 9) / 5 + 32).toFixed(0);
  };

  const addCityWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=API_KEY`
      );
      const data = await response.json();
      setCityWeatherData((prevData) => ({ ...prevData, [city]: data }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const removeCityWeather = (city) => {
    setCityWeatherData((prevData) => {
      const newData = { ...prevData };
      delete newData[city];
      return newData;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="mb-4">
          <h1 className="text-lg text-gray-300 text-start">Current Location</h1>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-2">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="flex items-center">
              <button
                onClick={toggleTemperatureUnit}
                className="bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold"
              >
                {isCelsius ? "°F" : "°C"}
              </button>
              <img
                src="/location.png"
                alt="location"
                className="w-5 h-5 object-cover rounded-lg ml-2"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="relative mb-4 w-3/4">
            <img
              src="/city.jpg"
              alt="city"
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="flex absolute top-2 left-2">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-20 h-20"
              />
              <p className="font-bold text-2xl md:text-5xl text-white">
                {getTemperature(weather.main.temp)}°{isCelsius ? "C" : "F"}
              </p>
            </div>
            <div className="absolute bottom-4 md:top-2 right-2 text-white">
              <p className="font-bold">
                {day}, {formattedTime}
              </p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
            <button onClick={() => setIsModalOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span>Add Favorite City</span>
            <AddCityModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              addCityWeather={addCityWeather}
            />
          </div>
        </div>

        <FavoriteCities
          cityWeatherData={cityWeatherData}
          removeCityWeather={removeCityWeather}
        />
      </div>
      <div className="col-span-1 bg-gray-50">
        <TodayHighlights weather={weather} />
        <ForecastDisplay forecast={forecast} />
      </div>
    </div>
  );
}
