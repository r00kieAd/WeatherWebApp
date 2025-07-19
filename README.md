# 🌦️ WeatherWebApp

A responsive React + Vite + TypeScript weather application that displays real-time and 4-day forecast weather data based on the user's geolocation. The app also updates the UI visually with weather icons and dynamic error handling.

---

## 🚀 Features

- 🌍 Fetches weather by current geolocation
- 📅 Shows current and 4-day forecast
- 🌡️ Displays temperatures (high, low, feels like), humidity, and condition descriptions
- ⏳ Loading spinner while fetching weather data
- ⚠️ Error notifications for failed API calls
- 📦 Built with:
  - **React** + **Vite**
  - **TypeScript**
  - **Axios** for API calls
  - **SCSS** for styling
  - **Modular Components** (`WeatherIcon`, `DisplayError`, etc.)

---

## 📸 UI Overview

- Main container shows:
  - Current weather temperature and condition
  - Weather icon
  - Feels like, humidity, and description
- Forecast section displays:
  - 4 upcoming days
  - Icons and temp ranges
- Menu includes:
  - Refresh button with rotating animation while fetching
  - Location change placeholder (future use)
  - Theme/snapshot toggle placeholder

---

## 📁 Folder Structure

WeatherWebApp/
│
├── public/
├── src/
│   ├── assets/                 # Images and icons
│   ├── components/             # WeatherIcon, DisplayError
│   ├── Services/               # API handlers (getWeather, getFourDaysForecast)
│   ├── App.tsx                 # Main application logic
│   ├── App.scss                # SCSS styling
│   ├── main.tsx                # App entry point
│
├── tsconfig*.json              # TypeScript config
├── vite.config.ts              # Vite configuration
├── package.json                # Project metadata & scripts

---

## 🧪 Local Development

### 1. Clone the repo
```bash
git clone https://github.com/your-username/WeatherWebApp.git
cd WeatherWebApp

2. Install dependencies

npm install

3. Set up environment variables

Create a .env file in the root directory:

VITE_OPEN_WEATHER_API_KEY=your_api_key
VITE_OPEN_WEATHER_API_HOST=your_api_host

Make sure you are using RapidAPI for the OpenWeather API, or update your headers accordingly.

4. Run the app locally

npm run dev


⸻

🌐 Deployment

Using Vercel
	•	Set the root directory to /WeatherWebApp if nested
	•	Environment variables (under Project > Settings > Environment Variables):
	•	VITE_OPEN_WEATHER_API_KEY
	•	VITE_OPEN_WEATHER_API_HOST
	•	Build command: npm run build
	•	Output directory: dist

⸻

📦 Scripts

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}


⸻

📌 Future Enhancements
	•	Add dynamic background styles based on weather
	•	Implement manual location input
	•	Add dark/light theme toggles
	•	Improve mobile responsiveness
	•	Use animated weather backgrounds (e.g., Lottie, MP4)

⸻

👨‍💻 Author

Made by @r00kieAd

⸻

🛡️ License

This project is licensed under the MIT License.

----