export default function WeatherCard({ city, weather }) {
  if (!weather || !weather.main) {
    return <div>No weather data available for {city}</div>;
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-2">{city}</h2>
      <div className="flex items-center">
        <img src={weatherIcon} alt={weather.weather[0].description} className="w-16 h-16" />
        <div>
          <p>Temperature: {weather.main.temp.toFixed(1)}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
