import React from "react";
import { useWeather } from "../Context/WeatherContext";

const OtherCities = () => {
  const { otherCities } = useWeather();
  if (!otherCities || otherCities.length === 0) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Cities</h2>
      <div className="grid grid-cols-1 gap-4">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center"
          >
            <div className="mr-4">
              <img
                className="w-12 h-12"
                src={city.icon}
                alt={city.weatherDescription}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {city.name}
              </h3>
              <p className="text-xl font-bold text-gray-800">
                {city.temperature}&#8457;
              </p>
              <p className="text-sm text-gray-600 capitalize">
                {city.weatherDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCities;
