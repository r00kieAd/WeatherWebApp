import { useEffect, useState } from 'react';
import refresh from './assets/reload.png';
import location from './assets/location.png';
import coloredTheme from './assets/coloredTheme.png';
import darkTheme from './assets/darkTheme.png';
import GetWeatherByLatLon from './Services/getWeather';
import GetFourDaysForecast from './Services/getFourDaysForecast';
import WeatherIcon from './components/weatherIcon';
import DisplayError from './components/displayError';
import './App.css'
// https://www.flaticon.com/packs/weather-384

function App() {

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherInfoFetched, setWeatherInfoFetched] = useState<boolean>(true);
  const [mainWeatherCondition, setMainWeatherCondition] = useState<string>('NA');
  const [mainWeatherDescription, setMainWeatherDescription] = useState<string>('NA');
  const [mainWeatherIconCode, setMainWeatherIconCode] = useState<string>('01d');
  const [mainTemperature, setMainTemperature] = useState<string>('00.00');
  const [mainHighTemp, setMainHighTemp] = useState<string>('00.00');
  const [mainLowTemp, setMainLowTemp] = useState<string>('00.00');
  const [feelsLike, setFeelsLike] = useState<string>('NA');
  const [humidity, setHumidity] = useState<string>('NA');
  const [futureWeatherIconCode1, setFutureWeatherIconCode1] = useState<string>('01d');
  const [futureWeatherIconCode2, setFutureWeatherIconCode2] = useState<string>('01d');
  const [futureWeatherIconCode3, setFutureWeatherIconCode3] = useState<string>('01d');
  const [futureWeatherIconCode4, setFutureWeatherIconCode4] = useState<string>('01d');
  const [futureWeatherHighTemp2, setfutureWeatherHighTemp2] = useState<string>('00.00');
  const [futureWeatherHighTemp1, setfutureWeatherHighTemp1] = useState<string>('00.00');
  const [futureWeatherHighTemp3, setfutureWeatherHighTemp3] = useState<string>('00.00');
  const [futureWeatherHighTemp4, setfutureWeatherHighTemp4] = useState<string>('00.00');
  const [futureWeatherLowTemp2, setfutureWeatherLowTemp2] = useState<string>('00.00');
  const [futureWeatherLowTemp1, setfutureWeatherLowTemp1] = useState<string>('00.00');
  const [futureWeatherLowTemp3, setfutureWeatherLowTemp3] = useState<string>('00.00');
  const [futureWeatherLowTemp4, setfutureWeatherLowTemp4] = useState<string>('00.00');
  const [futureDay1, setFutureDay1] = useState<string>('Weekday');
  const [futureDay2, setFutureDay2] = useState<string>('Weekday');
  const [futureDay3, setFutureDay3] = useState<string>('Weekday');
  const [futureDay4, setFutureDay4] = useState<string>('Weekday');
  const [errorExists, setErrorExists] = useState<boolean>(false);
  const [error1, setError1] = useState<string | undefined>(undefined);
  const [error2, setError2] = useState<string | undefined>(undefined);

  const LocationFetcher = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setLongitude(lon);
          setLatitude(lat);
        },
        (err) => {
          console.error("Geolocation error:", err.message);
        }
      );
    } else {
      console.warn("Geolocation not supported");
    }
  };

  useEffect(() => {
    LocationFetcher();
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getWeatherInfo();
    }
  }, [latitude, longitude]);

  async function getWeatherInfo() {
    try {
      setErrorExists(false);
      setWeatherInfoFetched(false);
      const res = await GetWeatherByLatLon({ latitude: latitude, longitude: longitude });
      if (res.status) {
        const tempData = res.resp.main;
        setMainTemperature(tempData.temp);
        setMainHighTemp(tempData.temp_max);
        setMainLowTemp(tempData.temp_min);
        setHumidity(tempData.humidity);
        setFeelsLike(tempData.feels_like);

        const weatherData = res.resp.weather && Array.isArray(res.resp.weather) ? res.resp.weather[0] : {};
        setMainWeatherCondition(weatherData.main);
        setMainWeatherDescription(weatherData.description);
        setMainWeatherIconCode(weatherData.icon);
        getFourDayWeatherInfo();
      } else {
        console.log(res);
        const errorMessage: any = res.statusMsg;
        setError1(errorMessage);
        setErrorExists(true);
      };
      setWeatherInfoFetched(true);
    } catch (error: any) {
      setError1(error.message);
      console.error(error.message);
      setErrorExists(true);
      setWeatherInfoFetched(true);
    }
  };

  async function getFourDayWeatherInfo() {
    try {
      const res: any = await GetFourDaysForecast({ latitude, longitude });
      if (res.status) {
        const tempData = res.resp.list;
        const futureDays: any[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let lastDate = "";
        for (let i = 0; i < tempData.length && futureDays.length < 4; i++) {
          const entry = tempData[i];
          const entryDateObj = new Date(entry.dt * 1000);
          entryDateObj.setHours(0, 0, 0, 0);
          const entryDateStr = entryDateObj.toDateString();
          if (entryDateObj > today && entryDateStr !== lastDate) {
            futureDays.push(entry);
            lastDate = entryDateStr;
          }
        }

        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const getWeekDay = (date: Date) => weekDays[date.getDay() % 7];

        if (futureDays[0]) {
          const date0 = new Date(futureDays[0].dt * 1000);
          setFutureDay1(getWeekDay(date0));
          setFutureWeatherIconCode1(futureDays[0].weather[0]?.icon || "01d");
          setfutureWeatherHighTemp1(futureDays[0].main?.temp_max?.toString() || "00.00");
          setfutureWeatherLowTemp1(futureDays[0].main?.temp_min?.toString() || "00.00");
        }
        if (futureDays[1]) {
          const date1 = new Date(futureDays[1].dt * 1000);
          setFutureDay2(getWeekDay(date1));
          setFutureWeatherIconCode2(futureDays[1].weather[0]?.icon || "01d");
          setfutureWeatherHighTemp2(futureDays[1].main?.temp_max?.toString() || "00.00");
          setfutureWeatherLowTemp2(futureDays[1].main?.temp_min?.toString() || "00.00");
        }
        if (futureDays[2]) {
          const date2 = new Date(futureDays[2].dt * 1000);
          setFutureDay3(getWeekDay(date2));
          setFutureWeatherIconCode3(futureDays[2].weather[0]?.icon || "01d");
          setfutureWeatherHighTemp3(futureDays[2].main?.temp_max?.toString() || "00.00");
          setfutureWeatherLowTemp3(futureDays[2].main?.temp_min?.toString() || "00.00");
        }
        if (futureDays[3]) {
          const date3 = new Date(futureDays[3].dt * 1000);
          setFutureDay4(getWeekDay(date3));
          setFutureWeatherIconCode4(futureDays[3].weather[0]?.icon || "01d");
          setfutureWeatherHighTemp4(futureDays[3].main?.temp_max?.toString() || "00.00");
          setfutureWeatherLowTemp4(futureDays[3].main?.temp_min?.toString() || "00.00");
        }

      } else {
        console.log(res.statusCode, res.statusMsg);
        setError2(res.statusMsg);
      }
    } catch (error: any) {
      setError2('Unknown Error Occured');
      console.error(error.message);
    }
  }


  return (
    <>
      <div id='errorDiv' className={errorExists === true ? 'pop-down': 'no-error'}><DisplayError error={error1} /></div>
      <div id="outerWrap">
        <div id="mainContainer">
          <div id="temperatureDiv">
            <div id="temperatureInfo">
              <div id="temperatureContainer" className='poppins-light'>
                <div className="main-temp-value temp-div"><span id="currTemp">{mainTemperature}</span></div>
                <div className="sub-temp-stats temp-div">
                  <div className="high-temp-value sub-temp-div"><span className='sub-temp-header'>H:</span> <span id="currHighTemp">{mainHighTemp}</span></div>
                  <div className="low-temp-value sub-temp-div"><span className='sub-temp-header'>L:</span> <span id="currLowTemp">{mainLowTemp}</span></div>
                </div>
              </div>
            </div>
            <div id="temperatureIcon" className='main-weather-icon'>
              <WeatherIcon iconCode={mainWeatherIconCode} />
            </div>
          </div>
          <div id="otherTempStats">
            <div id="ConditionStats">
              <div id="conditionContainer" className='other-stats-sub-div poppins-light'>
                <div className="condition-text condition-sub-div">Conditions:</div>
                <div className="condition-value condition-sub-div"><span id="conditions">{mainWeatherCondition}</span></div>
              </div>
            </div>
            <div id="DesctiptionStats">
              <div id="desctiptionContainer" className='other-stats-sub-div poppins-light'>
                <div className="desctiption-text desctiption-sub-div">Desctiption:</div>
                <div className="desctiption-value desctiption-sub-div"><span id="desctiption">{mainWeatherDescription}</span></div>
              </div>
            </div>
            <div id="feelsLikeStat">
              <div id="feelsLikeContainer" className='other-stats-sub-div poppins-light'>
                <div className="feelsLike-text feelsLike-sub-div">Feels Like:</div>
                <div className="feelsLike-value feelsLike-sub-div"><span id="feelsLike">{feelsLike}</span></div>
              </div>
            </div>
            <div id="humidityStat">
              <div id="humidityContainer" className='other-stats-sub-div poppins-light'>
                <div className="humidity-text humidity-sub-div">Humidity:</div>
                <div className="humidity-value humidity-sub-div"><span id="humidity">{humidity}%</span></div>
              </div>
            </div>
          </div>
          <div id="futureDaysStats">
            <div id="futureStatContainer">
              <div id="day1" className="days poppins-light">
                <div className="day-name future-stat-div">{futureDay1}</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode1} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp1}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp1}</div>
              </div>
              <div id="day2" className="days poppins-light">
                <div className="day-name future-stat-div">{futureDay2}</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode2} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp2}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp2}</div>
              </div>
              <div id="day3" className="days poppins-light">
                <div className="day-name future-stat-div">{futureDay3}</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode3} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp3}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp3}</div>
              </div>
              <div id="day4" className="days poppins-light">
                <div className="day-name future-stat-div">{futureDay4}</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode4} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp4}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp4}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="menu">
          <div id="refreshButtonDiv" className='menuDivs'>
            <button id='getWeatherButton' className={`infoButton ${weatherInfoFetched === false ? 'rotate' : ''}`} onClick={getWeatherInfo} >
              <img src={refresh} alt="" />
            </button>
          </div>
          <div id="changeLocationButtonDiv" className='menuDivs'>
            <button><img src={location} alt="" /></button>
          </div>
          <div id="snapshotButtonDiv" className='menuDivs'>
            <button><img src={coloredTheme} alt="" /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
