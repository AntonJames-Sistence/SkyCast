import React from "react";
import { useWeather } from "../Context/WeatherContext";

const DailyDetails = () => {
  const { cityData, loading, error } = useWeather();

  // error is handled by main component
  if (error) return null;

  if (loading || !cityData) {
    // Skeleton structure for shimmer effect while loading
    return (
      <section aria-labelledby="overview-title">
        <h2
          id="overview-title"
          className="text-white font-semibold text-2xl mb-4"
        >
          Today's Overview:
        </h2>
        <div className="flex gap-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-sky-400 h-48 w-1/2 animate-pulse flex flex-col justify-between items-center p-4 rounded-3xl shadow-xl"
              role="status"
              aria-live="polite"
              aria-busy="true"
            >
              <div className="bg-sky-300 h-5 w-20 rounded-full mb-2"></div>
              <div className="bg-sky-300 h-10 w-10 rounded-full"></div>
              <div className="bg-sky-300 h-6 w-12 rounded-full mt-2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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
    <section className="flex flex-col" aria-labelledby="overview-title">
      <h2
        id="overview-title"
        className="text-white font-semibold text-2xl mb-4"
      >
        Today's Overview:
      </h2>
      <div className="flex flex-col w-2/3 md:w-full self-center md:self-start md:flex-row gap-8">
        {/* Humidity */}
        <article
          className="bg-sky-500 md:h-48 md:w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30"
          aria-labelledby="humidity-title"
        >
          <h3 id="humidity-title" className="text-lg font-semibold mb-2">
            Humidity
          </h3>
          <img className="w-10" src="/humidity.webp" alt="Humidity Icon" />
          <p className="text-xl font-bold">{main.humidity}%</p>
        </article>

        {/* Wind Status */}
        <article
          className="bg-sky-500 md:h-48 md:w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30"
          aria-labelledby="wind-title"
        >
          <h3 id="wind-title" className="text-lg font-semibold mb-2">
            Wind Status
          </h3>
          <img className="w-10" src="/wind.webp" alt="Wind Icon" />
          <p className="text-xl font-bold">{wind.speed} m/s</p>
        </article>

        {/* Visibility */}
        <article
          className="bg-sky-500 md:h-48 md:w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30"
          aria-labelledby="visibility-title"
        >
          <h3 id="visibility-title" className="text-lg font-semibold mb-2">
            Visibility
          </h3>
          <img className="w-10" src="/visibility.webp" alt="Visibility Icon" />
          <p className="text-xl font-bold">{visibility / 1000} km</p>
        </article>

        {/* Sunrise & Sunset */}
        <article
          className="bg-sky-500 md:h-48 md:w-1/2 flex flex-col justify-between items-center text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30"
          aria-labelledby="sunrise-sunset-title"
        >
          <h3 id="sunrise-sunset-title" className="text-md font-semibold mb-2">
            Sunrise & Sunset
          </h3>
          <img className="w-10" src="/sun.webp" alt="Sun Icon" />
          <div>
            <p className="text-sm font-bold">Sunrise: {formatTime(sunrise)}</p>
            <p className="text-sm font-bold">Sunset: {formatTime(sunset)}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default DailyDetails;
