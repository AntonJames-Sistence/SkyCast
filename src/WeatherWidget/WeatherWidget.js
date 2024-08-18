import React, { useEffect, useState } from "react";
import WeatherWidgetTile from "./WeatherWidgetTile";

const WEATHER_API_KEY = "2152de8ca0fcc349444eabd7c3670f68";

const WeatherWidget = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [openTile, setOpenTile] = useState(new Date().getDay());

  useEffect(() => {
    // Save data in local storage for dev, remove later
    const savedWeatherData = localStorage.getItem(`weatherData-${city}`);
    if (savedWeatherData) {
      setWeatherData(JSON.parse(savedWeatherData));
      console.log(weatherData);
    } else {
    //   fetchWeatherData();
    }
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
      );
      if (!res.ok) {
        // Error message
        throw new Error(`City not found: ${city}`);
      }
      const data = await res.json();

      console.log(data); // remove before prod
      localStorage.setItem(`weatherData-${city}`, JSON.stringify(data)); // remove before prod

      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleTileClick = (day) => {
    if (openTile === day) {
      setOpenTile(null);
    } else {
      setOpenTile(day);
    }
  };

  if (error) {
    return (
      <div className="text-red-500" aria-live="assertive">
        {error}
      </div>
    );
  }

  // Improve later if there's time
  if (!weatherData) return <div aria-live="polite">loading...</div>;

  return (
    <div className="w-full p-8">
      <WeatherWidgetTile
        weatherData={weatherData}
        isOpen={openTile === new Date(weatherData.dt * 1000).getDay()}
        onClick={() =>
          handleTileClick(new Date(weatherData.dt * 1000).getDay())
        }
      />
    </div>
  );
};

export default WeatherWidget;
