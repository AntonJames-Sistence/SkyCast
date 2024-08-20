import React, { useState } from "react";
import { useWeather } from "../Context/WeatherContext";
import { FiMapPin } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { capFLetter } from "../WeatherWidget/utils";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { fetchWeatherData, cityData } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();

    if (city) {
      fetchWeatherData({ cityName: city });
    }
  };

  return (
    <section className="flex flex-col-reverse md:flex-row w-full justify-between pb-8">
      <div className="flex items-center text-white font-bold mt-8 md:mt-0">
        <FiMapPin className="mr-2 text-2xl" />
        <span className="text-2xl">{cityData ? `${capFLetter(cityData.name)}` : "Current Location"}</span>
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
    </section>
  );
};

export default SearchBar;
