import React, { createContext, useContext, useState } from "react";
import { processForecastData } from "../WeatherWidget/utils";

const WEATHER_API_KEY = "2152de8ca0fcc349444eabd7c3670f68";
const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    setLoading(true);

    try {
      // First API call to get city weather with lat and lon
      const cityRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
      );
      if (!cityRes.ok) {
        throw new Error(`City not found: ${city}`);
      }
      const cityData = await cityRes.json();
      const { lat, lon } = cityData.coord;

      // Second API call to fetch the One Call API data for 5 day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      if (!forecastRes.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const forecastData = await forecastRes.json();
      
      // Process the data to get daily averages for each day
      const dailyData = processForecastData(forecastData.list);

      setWeatherData(dailyData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weatherData, error, loading, fetchWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
