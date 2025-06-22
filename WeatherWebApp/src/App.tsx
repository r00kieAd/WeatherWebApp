import { useEffect, useState } from 'react';
import refresh from './assets/reload.png';
import location from './assets/location.png';
import save from './assets/floppy-disk.png';
import GetWeatherByLatLon from './Services/getWeather';
import GetFourDaysForecast from './Services/getFourDaysForecast';
import WeatherIcon from './components/weatherIcon';
import './App.css'
// https://www.flaticon.com/packs/weather-384

function App() {

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherInfoFetched, setWeatherInfoFetched] = useState<string>();
  const [mainWeatherCondition, setMainWeatherCondition] = useState<string>();
  const [mainWeatherDescription, setMainWeatherDescription] = useState<string>();
  const [mainWeatherIconCode, setMainWeatherIconCode] = useState<string>();
  const [mainTemperature, setMainTemperature] = useState<string>();
  const [mainHighTemp, setMainHighTemp] = useState<string>();
  const [mainLowTemp, setMainLowTemp] = useState<string>();
  const [feelsLike, setFeelsLike] = useState<string>();
  const [humidity, setHumidity] = useState<string>();
  const [futureWeatherIconCode1, setFutureWeatherIconCode1] = useState<string>();
  const [futureWeatherIconCode2, setFutureWeatherIconCode2] = useState<string>();
  const [futureWeatherIconCode3, setFutureWeatherIconCode3] = useState<string>();
  const [futureWeatherIconCode4, setFutureWeatherIconCode4] = useState<string>('NA');
  const [futureWeatherHighTemp2, setfutureWeatherHighTemp2] = useState<string>('NA');
  const [futureWeatherHighTemp1, setfutureWeatherHighTemp1] = useState<string>('NA');
  const [futureWeatherHighTemp3, setfutureWeatherHighTemp3] = useState<string>('NA');
  const [futureWeatherHighTemp4, setfutureWeatherHighTemp4] = useState<string>('NA');
  const [futureWeatherLowTemp2, setfutureWeatherLowTemp2] = useState<string>('NA');
  const [futureWeatherLowTemp1, setfutureWeatherLowTemp1] = useState<string>('NA');
  const [futureWeatherLowTemp3, setfutureWeatherLowTemp3] = useState<string>('NA');
  const [futureWeatherLowTemp4, setfutureWeatherLowTemp4] = useState<string>('NA');
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
      const res = await GetWeatherByLatLon({ latitude: latitude, longitude: longitude });
      if (res.status) {
        const tempData = res.resp.main;
        setMainTemperature(tempData.temp);
        setMainHighTemp(tempData.temp_max);
        setMainLowTemp(tempData.temp_min);
        setHumidity(tempData.humidity);
        setFeelsLike(tempData.feels_like);

        const weatherData = res.resp.weather;
        setMainWeatherCondition(weatherData.main);
        setMainWeatherDescription(weatherData.description);
        setMainWeatherIconCode(weatherData.icon);
        getFourDayWeatherInfo();
      } else {
        console.log(res.statusCode, res.statusMsg);
        const errorMessage:any = res.statusMsg;
        setError1(errorMessage);
      };
    } catch (error: any) {
      setError1('Unknown Error Occured');
      console.error(error.message);
    }
  };

  async function getFourDayWeatherInfo() {
    try {
      const res: any = await GetFourDaysForecast({ latitude: latitude, longitude: longitude });
      if (res.status) {
        const tempData = res.resp.list;
        const timestamp = Date.now();
        let startIndex = 0;
        let limit = tempData.length;
        tempData.forEach((e: any, i: number) => {
          if (e.dt * 1000 >= timestamp) {
            startIndex = i;
            return;
          };
        });
        let day = 1;
        while (startIndex < limit) {
          const data = tempData[startIndex];
          const iconCode = data.weather.icon;
          const highTemp = data.temp_max;
          const lowTemp = data.temp_min;
          // console.log('day:', day);
          // console.log('startIndex:', startIndex);
          // console.log('icon code:', iconCode);
          // console.log('day high:', highTemp);
          // console.log('day low:', lowTemp);
          switch (day) {
            case 1:
              setFutureWeatherIconCode1(iconCode);
              setfutureWeatherHighTemp1(highTemp);
              setfutureWeatherLowTemp1(lowTemp);
              break;
            case 2:
              setFutureWeatherIconCode2(iconCode);
              setfutureWeatherHighTemp2(highTemp);
              setfutureWeatherLowTemp2(lowTemp);
              break;
            case 3:
              setFutureWeatherIconCode3(iconCode);
              setfutureWeatherHighTemp3(highTemp);
              setfutureWeatherLowTemp3(lowTemp);
              break;
            case 4:
              setFutureWeatherIconCode4(iconCode);
              setfutureWeatherHighTemp4(highTemp);
              setfutureWeatherLowTemp4(lowTemp);
              break;
            default:
              break;
          };
          if (day + 1 === 5) break;
          day++;
          startIndex += 8;
        };
      } else {
        console.log(res.statusCode, res.statusMsg);
        setError2(res.statusMsg);
      };
    } catch (error: any) {
      setError2('Unknown Error Occured');
      console.error(error.message);
    };
  }


  return (
    <>
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
            <div id="temperatureIcon">
              <WeatherIcon iconCode={mainWeatherIconCode} />
            </div>
          </div>
          <div id="otherTempStats">
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
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode1} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp1}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp1}</div>
              </div>
              <div id="day2" className="days poppins-light">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode2} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp2}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp2}</div>
              </div>
              <div id="day3" className="days poppins-light">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode3} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp3}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp3}</div>
              </div>
              <div id="day4" className="days poppins-light">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><WeatherIcon iconCode={futureWeatherIconCode4} /></div>
                <div className="day-high future-stat-div">{futureWeatherHighTemp4}</div>
                <div className="day-low future-stat-div">{futureWeatherLowTemp4}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="menu">
          <div id="refreshButtonDiv" className='menuDivs'>
            <button id='getWeatherButton' className='infoButton' onClick={getWeatherInfo}><img src={refresh} alt="" /></button>
          </div>
          <div id="changeLocationButtonDiv" className='menuDivs'>
            <button><img src={location} alt="" /></button>
          </div>
          <div id="snapshotButtonDiv" className='menuDivs'>
            <button><img src={save} alt="" /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
