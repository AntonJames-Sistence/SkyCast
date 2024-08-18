import { getDateAndTime, KtoF } from "./utils";

const WeatherWidgetTile = ({ weatherData, isOpen, onClick }) => {
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`;

  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      {isOpen ? (
        <div className="flex flex-col w-80">
          <div className="flex justify-between w-full bg-[#AECADF] p-4 rounded-t-3xl">
            <p>{getDateAndTime().day}</p>
            <p>{getDateAndTime().time}</p>
          </div>
          <div className="flex flex-col bg-[#BBD7EC] px-4 rounded-b-3xl">
            <div className="flex justify-between w-full">
              <p className="self-center text-4xl font-bold">
                {KtoF(weatherData.temp).toFixed(0)} &#8457;
              </p>
              <img src={weatherIconUrl} className="h-18" alt="weather icon" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="">
                <span className="text-gray-600">Feels Like: </span>
                <span>
                  {KtoF(weatherData.feels_like).toFixed(0)} &#8457;
                </span>
              </div>
              <div>
                <span className="text-gray-600">Temp Max: </span>
                <span>
                  {KtoF(weatherData.temp_max).toFixed(0)} &#8457;
                </span>
              </div>
              <div>
                <span className="text-gray-600">Pressure: </span>
                <span>{weatherData.pressure} hPa</span>
              </div>
              <div>
                <span className="text-gray-600">Temp Min: </span>
                <span>
                  {KtoF(weatherData.temp_min).toFixed(0)} &#8457;
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
        <div className="flex flex-col h-full bg-[#1B1B1D] text-white rounded-3xl p-4">
          <div className="">
            {getDateAndTime().day.slice(0, 3).toUpperCase()}
          </div>
          <div>
            <img src={weatherIconUrl} className="h-18" alt="weather icon" />
            <p className="self-center text-4xl font-bold">
              {KtoF(weatherData.temp).toFixed(0)} &#8457;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidgetTile;
