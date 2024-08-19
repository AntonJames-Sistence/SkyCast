import React from "react";
import { useWeather } from "../Context/WeatherContext";
import { CtoF } from "../WeatherWidget/utils";

const OtherCities = () => {
  const { otherCities } = useWeather();
  if (!otherCities || otherCities.length === 0) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Other Cities</h2>
      <div className="flex flex-col gap-4">
        {otherCities.map((city, index) => (
          <div
            key={index}
            className="p-4 flex items-center bg-blue-300 text-white rounded-3xl shadow-xl shadow-blue-300/30"
          >
            <div className="mr-4">
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {city.name}
              </h3>
              <p className="text-xl font-bold text-gray-800">
                {CtoF(city.temperature).toFixed(0)}&#8457;
              </p>
              <p className="text-sm text-gray-600 capitalize">
                {city.weatherDescription}
              </p>
              <img
                className="w-12 h-12"
                src={city.icon}
                alt={city.weatherDescription}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCities;
