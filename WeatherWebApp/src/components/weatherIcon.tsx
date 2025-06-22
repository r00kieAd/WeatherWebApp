interface Params {
    iconCode: string | undefined;
}

const WeatherIcon = ({ iconCode }: Params) => {
  const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return <img className="weather-icon" src={url} alt="weather icon" />;
};

export default WeatherIcon;