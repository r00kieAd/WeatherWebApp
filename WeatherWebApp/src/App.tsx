import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <>
      <div id="outerWrap">
        <div id="mainConainer">
          <div id="temperatureDiv">
            <div id="temperature">
              {/* need to add html for displaying temp stats */}
            </div>
            <div id="tempIcon">
              {/* need to add html for displaying related weather icon */}
            </div>
          </div>
          <div id="otherTempStats">
            <div id="aqiStat">
              {/* need to add html */}
            </div>
            <div id="humidityStat">
              {/* need to add humidity stat html */}
            </div>
          </div>
          <div id="futureDaysStats">
            {/* need to add html structure */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
