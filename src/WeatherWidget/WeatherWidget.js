import React, { useEffect, useState } from "react";

const WEATHER_API_KEY = "2152de8ca0fcc349444eabd7c3670f68";

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);



  // Function to convert temperature from Kelvin to Fahrenheit
  const KtoF = (tempKevlin) => {
    return ((tempKevlin - 273.15) * 9) / 5 + 32;
  }

  return <div>{`Hello app`}</div>;
};

export default WeatherWidget;
