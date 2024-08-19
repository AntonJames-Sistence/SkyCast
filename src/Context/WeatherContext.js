import React, { createContext, useContext, useState } from "react";
import { processForecastData } from "../WeatherWidget/utils";

const WEATHER_API_KEY = "6e629565668ca72b20a0fab058f92514";
// const WEATHER_API_KEY_FALLBACK = "1471e21c9d98348c865b24720ab83b77";
const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async ({ cityName, lat, lon }) => {
    setLoading(true);

    try {
      // First API call to get city weather with lat and lon
      if (cityName) {
        const cityRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}`
        );
        if (!cityRes.ok) {
          throw new Error(`City not found: ${cityName}`);
        }
        const cityData = await cityRes.json();
        
        setCityData(cityData);
        lat = cityData.coord.lat;
        lon = cityData.coord.lon;
      }

      // Second API call to fetch the One Call API data for 5 day forecast
      if (lat && lon) {
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        if (!forecastRes.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const forecastData = await forecastRes.json();

        // Process the data to get daily averages and better structure
        const dailyData = processForecastData(forecastData.list);

        setWeatherData(dailyData);
        setError(null);
      } else {
        throw new Error("City not found");
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weatherData, cityData, error, loading, fetchWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
