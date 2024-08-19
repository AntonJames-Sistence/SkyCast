import React, { useState } from "react";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import { useWeather } from "../Context/WeatherContext";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { fetchWeatherData } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();

    if (city) {
      fetchWeatherData(city);
      console.log('City set to:', city); // remove at prod
    }
  };

  return (
    <div className="p-10">
      <form
        className="flex items-center justify-center"
        onSubmit={handleSearch}
      >
        <label htmlFor="city" className="font-semibold">
          Search City:
        </label>
        <input
          id="city"
          data-testid="weather-input"
          className="ml-2 border p-2 border-gray-200 rounded-l-lg"
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="text-sm border rounded-r-lg p-3 uppercase font-bold text-white bg-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
