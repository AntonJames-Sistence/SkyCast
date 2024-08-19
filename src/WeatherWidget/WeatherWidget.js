import React, { useState } from "react";
import WeatherWidgetTile from "./WeatherWidgetTile";
import { useWeather } from "../Context/WeatherContext";

const WeatherWidget = () => {
  const { weatherData, error, loading } = useWeather();
  const [openTileIndex, setOpenTileIndex] = useState(0);

  const handleTileClick = (index) => {
    setOpenTileIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (error) {
    return (
      <div className="text-red-500 font-bold text-xl flex justify-center">
        {error}
      </div>
    );
  }

  if (loading || !weatherData) {
    return (
      <div className="flex gap-8 pb-8 justify-between">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-40 h-56 rounded-3xl bg-sky-400 animate-pulse flex flex-col justify-between shadow-xl">
            <div className="bg-sky-500 h-16 w-full rounded-t-3xl"></div>
            <div className="bg-sky-300 h-10 w-10 rounded-full self-center mt-4"></div>
            <div className="h-6 w-24 bg-sky-300 rounded-full self-center mt-2"></div>
            <div className="grid grid-cols-2 gap-4 p-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-sky-300 rounded-full"></div>
              ))}
            </div>
            <div className="h-16 bg-sky-500 w-full rounded-b-3xl"></div>
          </div>
        ))}
      </div>
    );
  }

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
