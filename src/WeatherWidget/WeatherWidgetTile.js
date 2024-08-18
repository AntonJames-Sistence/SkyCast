import { getDateAndTime, KtoF } from "./utils";

const WeatherWidgetTile = ({ weatherData }) => {
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
  return (
    <div className="flex flex-col w-80">
      <div className="flex justify-between w-full bg-[#AECADF] p-4 rounded-t-3xl">
        <p>{getDateAndTime().day}</p>
        <p>{getDateAndTime().time}</p>
      </div>
      <div className="flex flex-col bg-[#BBD7EC] px-4 rounded-b-3xl">
        <div className="flex justify-between w-full">
          <p className="self-center text-4xl font-bold">
            {KtoF(weatherData.main.temp).toFixed(0)} &#8457;
          </p>
          <img src={weatherIconUrl} className="h-18" alt="weather icon" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="">
            <span className="text-gray-600">Feels Like: </span>
            <span>{KtoF(weatherData.main.feels_like).toFixed(0)} &#8457;</span>
          </div>
          <div>
            <span className="text-gray-600">Temp Max: </span>
            <span>{KtoF(weatherData.main.temp_max).toFixed(0)} &#8457;</span>
          </div>
          <div>
            <span className="text-gray-600">Pressure: </span>
            <span>{weatherData.main.pressure} hPa</span>
          </div>
          <div>
            <span className="text-gray-600">Temp Min: </span>
            <span>{KtoF(weatherData.main.temp_min).toFixed(0)} &#8457;</span>
          </div>
          <div>
            <span className="text-gray-600">Humidity: </span>
            <span>{weatherData.main.humidity}%</span>
          </div>
          <div>
            <span className="text-gray-600">Sunrise: </span>
            <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
          <div>
          </div>
          <div>
            <span className="text-gray-600">Sunset: </span>
            <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidgetTile;
