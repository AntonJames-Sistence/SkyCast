import React, { useState } from "react";
import WeatherWidgetTile from "./WeatherWidgetTile";
import { useWeather } from "../Context/WeatherContext";

const WeatherWidget = () => {
  const { weatherData, error, loading } = useWeather();
  const [openTileIndex, setOpenTileIndex] = useState(0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 font-bold text-xl flex justify-center">{error}</div>;
  if (!weatherData) return null;

  const handleTileClick = (index) => {
    setOpenTileIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex gap-8 pb-8">
      {weatherData.map((daily, index) => (
        <WeatherWidgetTile
          key={index}
          weatherData={daily}
          isOpen={index === openTileIndex}
          onClick={() => handleTileClick(index)}
          idx={index}
        />
      ))}
    </div>
  );
};

export default WeatherWidget;
