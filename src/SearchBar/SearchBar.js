import React, { useState, useEffect } from "react";
import { useWeather } from "../Context/WeatherContext";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { fetchWeatherData } = useWeather();

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords)
          const { latitude, longitude } = position.coords;
          // Fetch weather data using latitude and longitude
          fetchWeatherData({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported');
    }
  };

  // Get initial data
  useEffect(() => {
    handleGeolocation();
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();

    if (city) {
      fetchWeatherData({ cityName: city });
    }
  };

  return (
    <div className="p-10">
      <form
        className="flex items-center justify-center"
        onSubmit={handleSearch}
      >
        <label htmlFor="city" className="font-semibold text-white">
          Search City:
        </label>
        <input
          id="city"
          data-testid="weather-input"
          className="ml-2 border p-1.5 border-gray-200 rounded-l-lg"
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="text-sm border rounded-r-lg p-2 uppercase font-bold text-white bg-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
