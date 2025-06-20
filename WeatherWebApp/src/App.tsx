import { useState } from 'react'
import clearSky from './assets/clear-sky.png'
import refresh from './assets/reload.png'
import switchh from './assets/location.png'
import save from './assets/floppy-disk.png'
import './App.css'
// https://www.flaticon.com/packs/weather-384

function App() {

  const [mainTemperature, setMainTemperature] = useState();
  const [mainHighTemp, setMainHighTemp] = useState();
  const [mainLowTemp, setMainLowTemp] = useState();
  const [AQI, setAQI] = useState();
  const [humidity, setHumidity] = useState();

  
  return (
    <>
      <div id="outerWrap">
        <div id="mainContainer">
          <div id="temperatureDiv">
            <div id="temperatureInfo">
              <div id="temperatureContainer" className='poppins-light'>
                <div className="main-temp-value temp-div"><span id="currTemp">0</span></div>
                <div className="sub-temp-stats temp-div">
                  <div className="high-temp-value sub-temp-div">H: <span id="currHighTemp">+5</span></div>
                  <div className="low-temp-value sub-temp-div">H: <span id="currLowTemp">-2</span></div>
                </div>
              </div>
            </div>
            <div id="temperatureIcon">
              <img className="weather-icon clear-sky" src={clearSky} alt="clear sky" />
            </div>
          </div>
          <div id="otherTempStats">
            <div id="aqiStat">
              <div id="aqiContainer" className='other-stats-sub-div poppins-light'>
                <div className="aqi-text aqi-sub-div">Air Quality Index:</div>
                <div className="aqi-value aqi-sub-div"><span id="aqi">Good</span></div>
              </div>
            </div>
            <div id="humidityStat">
              <div id="humidityContainer" className='other-stats-sub-div poppins-light'>
                <div className="humidity-text humidity-sub-div">Humidity:</div>
                <div className="humidity-value humidity-sub-div"><span id="humidity">24%</span></div>
              </div>
            </div>
          </div>
          <div id="futureDaysStats">
            <div id="futureStatContainer">
              <div id="day1" className="days poppins-light">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><img src={clearSky} alt="clear sky" /></div>
                <div className="day-high future-stat-div">+26</div>
                <div className="day-low future-stat-div">+22</div>
              </div>
              <div id="day2" className="days poppins-light">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><img src={clearSky} alt="clear sky" /></div>
                <div className="day-high future-stat-div">+26</div>
                <div className="day-low future-stat-div">+22</div>
              </div>
              <div id="day3" className="days poppins-light">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><img src={clearSky} alt="clear sky" /></div>
                <div className="day-high future-stat-div">+26</div>
                <div className="day-low future-stat-div">+22</div>
              </div>
              <div id="day4" className="days poppins-light">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><img src={clearSky} alt="clear sky" /></div>
                <div className="day-high future-stat-div">+26</div>
                <div className="day-low future-stat-div">+22</div>
              </div>
            </div>
          </div>
        </div>
        <div id="menu">
          <div id="refreshButtonDiv" className='menuDivs'>
            <button><img src={refresh} alt="" /></button>
          </div>
          <div id="changeLocationButtonDiv" className='menuDivs'>
            <button><img src={switchh} alt="" /></button>
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
