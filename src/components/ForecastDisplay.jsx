/** @format */

import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Temperature = ({ tempMin, tempMax }) => (
  <div className="flex gap-1 md:gap-4 bg-purple-300 rounded-md px-2 md:px-8 py-5">
    <div className="flex items-center">
      <FaArrowDown className="mr-1" />
      <p className="text-white">{tempMin.toFixed(0)}°C</p>
    </div>
    <div className="flex items-center">
      <FaArrowUp className="mr-1" />
      <p className="text-white">{tempMax.toFixed(0)}°C</p>
    </div>
  </div>
);

const WeatherInfo = ({ icon, dayName, description }) => (
  <div className="flex flex-grow items-center gap-1 md:gap-4">
    <img src={icon} alt={description} className="w-16 h-16" />
    <div className="flex flex-col">
      <h3 className="text-sm md:text-lg font-bold">{dayName}</h3>
      <p className="capitalize mb-2">{description}</p>
    </div>
  </div>
);

export default function ForecastDisplay({ forecast }) {
  if (!forecast || !forecast.list) {
    return <p>No forecast data available.</p>;
  }

  const dailyForecasts = [];
  const seenDates = new Set();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString();

    if (!seenDates.has(day)) {
      const hours = date.getHours();
      if (hours >= 9 && hours <= 15) {
        dailyForecasts.push(item);
        seenDates.add(day);
      }
    }
  });

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl text-start font-bold mb-4">
        5 Days Weather Forecast
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {dailyForecasts.slice(0, 5).map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString(undefined, {
            weekday: "long",
          });
          const weatherIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

          const isEven = index % 2 === 0;

          return (
            <div
              key={item.dt}
              className={`rounded-lg border border-gray-200 flex items-center gap-2 md:gap-8 w-full bg-white
              }`}
            >
              {/* Weather Info Component */}
              {isEven ? (
                <WeatherInfo
                  icon={weatherIcon}
                  dayName={dayName}
                  description={item.weather[0].description}
                />
              ) : (
                <Temperature
                  tempMin={item.main.temp_min}
                  tempMax={item.main.temp_max}
                />
              )}

              {isEven ? (
                <Temperature
                  tempMin={item.main.temp_min}
                  tempMax={item.main.temp_max}
                />
              ) : (
                <WeatherInfo
                  icon={weatherIcon}
                  dayName={dayName}
                  description={item.weather[0].description}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
