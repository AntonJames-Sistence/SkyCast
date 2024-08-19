import React from "react";
import { useWeather } from "../Context/WeatherContext";
import { CtoF } from "../WeatherWidget/utils";

const OtherCities = () => {
  const { otherCities, loading, otherCititesError } = useWeather();

  if (loading || !otherCities || otherCities.length === 0) {
    return (
      <div className="p-2 w-1/6">
        <h2 className="text-2xl font-bold text-white mb-4">Other Cities</h2>
        <div className="flex flex-col gap-4">
          {/* Skeleton for Other Cities */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-4 flex justify-between items-center bg-blue-300 animate-pulse rounded-3xl shadow-xl"
            >
              <div>
                <div className="bg-blue-200 h-5 w-24 rounded-full mb-2"></div>
                <div className="bg-blue-200 h-6 w-16 rounded-full mb-1"></div>
                <div className="bg-blue-200 h-4 w-20 rounded-full"></div>
              </div>
              <div className="bg-blue-200 w-12 h-12 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (otherCititesError) {
    return (
      <div className="p-2 w-1/6">
        <h2 className="text-2xl font-bold text-white mb-4">Other Cities</h2>
        <p className="text-red-500">{otherCititesError}</p>
      </div>
    );
  }

  return (
    <div className="p-2 w-1/6">
      <h2 className="text-2xl font-bold text-white mb-4">Other Cities</h2>
      <div className="flex flex-col gap-4">
        {otherCities.map((city, index) => (
          <div
            key={index}
            className="p-4 flex justify-between items-center bg-blue-300 text-white rounded-3xl shadow-xl shadow-blue-300/30"
          >
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
            </div>
              <div>
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
