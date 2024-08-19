import React, { useState, useEffect } from "react";
import { useWeather } from "../Context/WeatherContext";
import { FiMapPin } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { capFLetter } from "../WeatherWidget/utils";

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
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported");
    }
  };

  // Get initial data
  useEffect(() => {
    handleGeolocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (city) {
      fetchWeatherData({ cityName: city });
    }
  };

  return (
    <div className="flex justify-between pb-8">
      <div className="flex items-center text-white">
        <FiMapPin className="mr-2 text-2xl" />
        <span className="text-4xl">Forecast for&nbsp;</span>
        <span className="text-4xl">{city ? `${capFLetter(city)}` : "Current Location"}</span>
      </div>
      <form
        className="flex"
        onSubmit={handleSearch}
        aria-label="City Search Bar"
      >
        <span className="flex items-center p-2 text-gray-400 rounded-l-lg bg-white">
          <FaSearch />
        </span>
        <input
          id="city"
          data-testid="weather-input"
          className="pl-2 p-0.5"
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search City"
        />
        <button
          className="text-sm border rounded-r-lg p-1 uppercase font-bold text-white bg-sky-500"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
