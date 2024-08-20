import React from "react";
import { useWeather } from "../Context/WeatherContext";
import { CtoF } from "../WeatherWidget/utils";

const OtherCities = () => {
  const { otherCities, loading, otherCitiesError } = useWeather();

  if (otherCitiesError) {
    return (
      <div className="p-2 w-1/6">
        <h2 className="text-2xl font-bold text-white mb-4">Other Cities</h2>
        <p className="text-red-500 font-semibold text-xl">{otherCitiesError}</p>
      </div>
    );
  }

  if (loading || !otherCities || otherCities.length === 0) {
    // Skeleton structure for shimmer effect while loading
    return (
      <section className="p-2 w-3/4 lg:w-1/6" role="status" aria-live="polite">
        <h2 className="text-2xl font-bold text-white mb-4">Other Cities:</h2>
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-4 flex justify-between items-center bg-blue-300 animate-pulse rounded-3xl shadow-xl"
              aria-label="Loading weather data"
            >
              <div>
                <div className="bg-blue-200 h-5 w-24 rounded-full mb-2" aria-hidden="true"></div>
                <div className="bg-blue-200 h-6 w-16 rounded-full mb-1" aria-hidden="true"></div>
                <div className="bg-blue-200 h-4 w-20 rounded-full" aria-hidden="true"></div>
              </div>
              <div className="bg-blue-200 w-12 h-12 rounded-full" aria-hidden="true"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="p-2 mt-8 md:mt-0 w-3/4 self-center md:self-start lg:w-1/6">
      <h2 className="text-2xl font-bold text-white mb-4">Other Cities:</h2>
      <div className="flex flex-col gap-4">
        {otherCities.map((city, index) => (
          <article
            key={index}
            className="p-4 flex justify-between items-center bg-blue-300 text-white rounded-3xl shadow-xl shadow-blue-300/30"
            aria-label={`Weather in ${city.name}`}
            role="region"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700" id={`city-name-${index}`}>
                {city.name}
              </h3>
              <p className="text-xl font-bold text-gray-800" aria-labelledby={`city-name-${index}`}>
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
                  alt={`${city.weatherDescription} in ${city.name}`}
                  aria-hidden="true"
                />
              </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OtherCities;
