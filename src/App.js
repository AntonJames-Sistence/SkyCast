import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import WeatherWidget from './WeatherWidget/WeatherWidget';
import { WeatherProvider } from './Context/WeatherContext';

const App = () => {
  return (
    <WeatherProvider>
      <div>
        <SearchBar />
        <WeatherWidget />
      </div>
    </WeatherProvider>
  );
}

export default App;