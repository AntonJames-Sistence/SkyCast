import React from "react";
import WeatherWidgetTile from "./WeatherWidgetTile";
import { useWeather } from "../Context/WeatherContext";

const WeatherWidget = () => {
    const { weatherData, error, loading } = useWeather();
    console.log(weatherData) // remove before prod

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!weatherData) return null;
  
    return (
      <div className="flex gap-8">
        {weatherData.map((daily, index) => (
          <WeatherWidgetTile
            key={index}
            weatherData={daily}
            isOpen={index === 0}
          />
        ))}
      </div>
    );
};

export default WeatherWidget;
