import { useWeather } from "../Context/WeatherContext";
import { CtoF, getDateAndTime, KtoF } from "./utils";

const WeatherWidgetTile = ({ weatherData, isOpen, onClick, idx }) => {
  const { cityData } = useWeather();
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather.icon.slice(0,2) + 'd'}@2x.png`;
  const { day, time } = getDateAndTime(weatherData.date);

  console.log(day); // remove before prod
  // If cityData is available render temperature at this momemt, else render average
  const isCityDataAvailable = idx === 0 && cityData;
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      {isOpen ? (
        <div className="flex flex-col w-80">
          <div className="flex justify-between w-full bg-sky-500 p-4 rounded-t-3xl font-semibold">
            <p>{day}</p>
            <p>{isCityDataAvailable ? time : ''}</p>
          </div>
          <div className="flex flex-col bg-sky-400 p-4 rounded-b-3xl">
            <div className="flex justify-between w-full">
              <p className="self-center text-4xl font-bold">
              {isCityDataAvailable 
                  ? KtoF(cityData.main.temp).toFixed(0) 
                  : CtoF(weatherData.temp).toFixed(0)}  &#8457;
              </p>
              <img src={weatherIconUrl} className="h-18" alt="weather icon" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="">
                <span className="text-gray-600">Feels Like: </span>
                <span>
                {isCityDataAvailable 
                    ? KtoF(cityData.main.feels_like).toFixed(0) 
                    : CtoF(weatherData.feels_like).toFixed(0)}  &#8457;
                </span>
              </div>
              <div>
                <span className="text-gray-600">Temp Max: </span>
                <span>
                {isCityDataAvailable 
                    ? KtoF(cityData.main.temp_max).toFixed(0) 
                    : CtoF(weatherData.temp_max).toFixed(0)}  &#8457;
                </span>
              </div>
              <div>
                <span className="text-gray-600">Pressure: </span>
                <span>{weatherData.pressure} hPa</span>
              </div>
              <div>
                <span className="text-gray-600">Temp Min: </span>
                <span>
                {isCityDataAvailable 
                    ? KtoF(cityData.main.temp_min).toFixed(0) 
                    : CtoF(weatherData.temp_min).toFixed(0)}  &#8457;
                </span>
              </div>
              <div>
                <span className="text-gray-600">Humidity: </span>
                <span>{weatherData.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full bg-blue-300 text-white rounded-3xl">
          <div className="border-b border-gray-600 w-full text-center p-4 font-semibold">
            {day.slice(0, 3).toUpperCase()}
          </div>
          <div className="flex flex-col h-full justify-between p-4">
            <img src={weatherIconUrl} className="h-18" alt="weather icon" />
            <p className="self-center text-2xl font-bold">
              {CtoF(weatherData.temp).toFixed(0)} &#8457;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidgetTile;
