import React, { useEffect, useState } from "react";
import { capFLetter, KtoF } from "./utils";

const WEATHER_API_KEY = "2152de8ca0fcc349444eabd7c3670f68";

const WeatherWidget = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
      );
      if (!res.ok) {
        throw new Error(`City not found: ${city}`);
      }
      const data = await res.json();
      console.log(data); // remove before prod
      setWeatherData(data);
      setError(null);
    } catch (error) {
      // Set the error message
      setError(error.message);
      setWeatherData(null);
    }
  };

  if (error) {
    return (
      <div className="text-red-500" aria-live="assertive">
        {error}
      </div>
    );
  }

  if (!weatherData) { // improve later if there's time
    return <div aria-live="polite">loading...</div>;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
  return (
    <div className="shadow-lg text-gray-500 p-4 flex flex-row justify-center text-center bg-white rounded-lg">
      <h2 className="">{capFLetter(city)}</h2>
      <img src={iconUrl} className="self-center" alt="weather icon" />
      <div className="capitalize mb-4">
        {weatherData?.weather[0].description}
      </div>
      <div>
        <span className="mr-4">Temperature:</span>
        <span className="font-semibold text-black text-3xl">
          {KtoF(weatherData?.main.temp).toFixed(0)} &#8457;
        </span>
      </div>
    </div>
  );
};

export default WeatherWidget;
