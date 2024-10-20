/** @format */

import React, { useState, useEffect } from "react";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const API_KEY = "Your_API_KEY";

  // Helper function to fetch data
  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed fetching data");
      }
      const data = await response.json();
      setDataFunction(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch current weather
  const fetchWeatherResponse = (cityName) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    fetchData(API_URL, setWeatherData);
  };

  // Fetch weather forecast
  const fetchForecastResponse = (cityName) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
    fetchData(API_URL, setForecastData);
  };

  const handleSearch = (cityName) => {
    fetchWeatherResponse(cityName);
    fetchForecastResponse(cityName);
    localStorage.setItem("lastSearchedCity", cityName);
  };

  const fetchCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
          const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          await fetchData(API_URL, setWeatherData);
          await fetchData(forecastURL, setForecastData);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);


  console.log(weatherData);
  return (
    <>
      <div>
        <Search onSearch={handleSearch} />
        <hr className="w-full h-0.5 bg-gray-300 my-4" />
        {weatherData && (
          <WeatherDisplay weather={weatherData} forecast={forecastData} />
        )}
      </div>
    </>
  );
}
