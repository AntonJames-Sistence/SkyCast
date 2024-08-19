import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import { WeatherProvider } from "./Context/WeatherContext";

const App = () => {
  return (
    <WeatherProvider>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/clouds.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <SearchBar />
          <WeatherWidget />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;
