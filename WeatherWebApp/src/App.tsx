import { useState } from 'react'
import clearSky from './assets/clear-sky.png'
import './App.css'

function App() {
  

  return (
    <>
      <div id="outerWrap">
        <div id="mainConainer">
          <div id="temperatureDiv">
            <div id="temperature">
              <div id="temperatureContainer">
                <div className="main-temp-value temp-div">0</div>
                <div className="high-temp-value temp-div">H: <span id="currHighTemp">+5</span></div>
                <div className="low-temp-value temp-div">H: <span id="currLowTemp">-2</span></div>
              </div>
            </div>
            <div id="tempIcon">
              <img className="weather-icon clear-sky" src={clearSky} alt="clear sky" />
            </div>
          </div>
          <div id="otherTempStats">
            <div id="aqiStat">
              <div id="aqiContainer">
                <div className="aqi-text aqi-sub-div">Air Quality Index:</div>
                <div className="aqi-value aqi-sub-div"><span id="aqi">Good</span></div>
              </div>
            </div>
            <div id="humidityStat">
              <div id="humidityContainer">
                <div className="humidity-text humidity-sub-div">Humidity:</div>
                <div className="humidity-value humidity-sub-div"><span id="humidity">24%</span></div>
              </div>
            </div>
          </div>
          <div id="futureDaysStats">
            <div id="futureStatContainer">
              <div id="day1">
                <div className="day-name future-stat-div">Today</div>
                <div className="day-weather-icon future-stat-div"><img src={clearSky} alt="clear sky" /></div>
                <div className="day-high future-stat-div">+26</div>
                <div className="day-low future-stat-div">+22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
