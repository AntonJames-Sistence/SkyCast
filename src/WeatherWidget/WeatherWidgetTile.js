import { getDateAndTime, KtoF } from "./utils";

const WeatherWidgetTile = ({ weatherData }) => {
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
  return (
    <div className="flex flex-col w-64">
      <div className="flex justify-between w-full bg-[#AECADF] p-4 rounded-t-2xl">
        <p>{getDateAndTime().day}</p>
        <p>{getDateAndTime().time}</p>
      </div>
      <div className="flex bg-[#BBD7EC] px-4 rounded-b-2xl">
        <div className="flex justify-between w-full">
          <p className="self-center text-2xl">
            {KtoF(weatherData.main.temp).toFixed(0)} &#8457;
          </p>
          <img src={weatherIconUrl} className="h-14" alt="weather icon" />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default WeatherWidgetTile;
