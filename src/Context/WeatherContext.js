import React, { createContext, useContext, useState, useEffect } from "react";
import { processForecastData } from "../WeatherWidget/utils";

const WEATHER_API_KEY = "6e629565668ca72b20a0fab058f92514";
// const WEATHER_API_KEY_FALLBACK = "1471e21c9d98348c865b24720ab83b77";
const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [otherCities, setOtherCities] = useState([]);
  const [error, setError] = useState(null);
  const [otherCitiesError, setOtherCitiesError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCityName = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch city name");
      }
      const data = await res.json();
      return data[0].name;
    } catch (error) {
      console.error("Error fetching city name:", error);
      setError("Unable to fetch city name");
      return null;
    }
  };

  const fetchWeatherData = async ({ cityName, lat, lon }) => {
    setLoading(true);

    try {
      // Required cityName for multiple components
      if (!cityName && lat && lon) {
        cityName = await fetchCityName(lat, lon);
      }
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

  // fetch cities for OtherCities component
  const fetchOtherCitiesWeather = async (cities) => {
    try {
      const fetchedCities = await Promise.all(
        cities.map(async (city) => {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
          );
          if (!res.ok) {
            throw new Error(`Couldn't load other cities, please try to refresh the page.`);
          }
          const data = await res.json();
          return {
            name: data.name,
            temperature: data.main.temp,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon.slice(0,2) + 'd'}.png`,
            weatherDescription: data.weather[0].description,
          };
        })
      );

      setOtherCities(fetchedCities);
      setOtherCitiesError(null);
    } catch (error) {
      setOtherCitiesError(error.message);
    }
  };

  // Get user's geolocation and call fetchWeatherData to display current location forecast
  const fetchGeoLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported");
    }
  };

  useEffect(() => {
    fetchGeoLocationWeather();

    const cities = ["New York", "London", "Tokyo", "Kyiv"];
    fetchOtherCitiesWeather(cities);
  }, []);

  return (
    <WeatherContext.Provider
      value={{ weatherData, cityData, otherCities, error, otherCitiesError, loading, fetchWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
