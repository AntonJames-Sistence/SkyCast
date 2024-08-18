import React, { useState } from "react";
import WeatherWidget from "../WeatherWidget/WeatherWidget";

const SearchBar = () => {
  const [city, setCity] = useState(null);

  return (
    <div className="mt-10">
      <form
        className="flex items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          const cityValue = formdata.get("city").toString();
          setCity(cityValue);
          console.log("City set to:", cityValue);
        }}
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
        />
        <button
          className="text-sm border rounded-r-lg p-3 uppercase font-bold text-white bg-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div aria-live="polite">
        {city && (
          <div className="mt-10 flex justify-center">
            <WeatherWidget city={city} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
