import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import WeatherWidget from './WeatherWidget/WeatherWidget';
import { WeatherProvider } from './Context/WeatherContext';

const App = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/clouds.webp')" }}>
        <SearchBar />
        <WeatherWidget />
      </div>
    </WeatherProvider>
  );
}

export default App;