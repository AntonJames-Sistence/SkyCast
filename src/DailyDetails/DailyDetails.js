import React from "react";
import { useWeather } from "../Context/WeatherContext";

const DailyDetails = () => {
  const { cityData } = useWeather();
  if (!cityData) return null;

  const { main, wind, visibility, sys } = cityData;
  const { sunrise, sunset } = sys;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div>
      <div className="text-white font-semibold text-2xl mb-4">
        Today's Overview:
      </div>
      <div className="flex gap-8">
        {/* Humidity */}
        <div className="bg-sky-500 h-48 w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30">
          <h3 className="text-lg font-semibold mb-2">Humidity</h3>
          <img className="w-10" src="/humidity.webp" alt="Humidity Icon" />
          <p className="text-xl font-bold">{main.humidity}%</p>
        </div>

        {/* Wind Status */}
        <div className="bg-sky-500 w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30">
          <h3 className="text-lg font-semibold mb-2">Wind Status</h3>
          <img className="w-10" src="/wind.webp" alt="Humidity Icon" />
          <p className="text-xl font-bold">{wind.speed} m/s</p>
        </div>

        {/* Visibility */}
        <div className="bg-sky-500 w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30">
          <h3 className="text-lg font-semibold mb-2">Visibility</h3>
          <img className="w-10" src="/visibility.webp" alt="Humidity Icon" />
          <p className="text-xl font-bold">{visibility / 1000} km</p>
        </div>

        {/* Sunrise & Sunset */}
        <div className="bg-sky-500 w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30">
          <h3 className="text-md font-semibold mb-2">Sunrise & Sunset</h3>
          <img className="w-10" src="/sun.webp" alt="Humidity Icon" />
          <div>
            <p className="text-sm font-bold">Sunrise: {formatTime(sunrise)}</p>
            <p className="text-sm font-bold">Sunset: {formatTime(sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDetails;
