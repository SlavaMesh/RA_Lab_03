import { useState, useEffect } from 'react';
import { LocaleWeather } from '../src/components/localeweather/index.jsx';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../src/components/header/index.js'
import { Settings } from './pages/settings/index.js';
import { Search } from './pages/search/index.js'
import { Technical } from './pages/technical/index.js';

const API_KEY = 'f7a05de8e3766fc6c6f42e619d277de7';



// define the types of state and props in App component

export type WeatherFromServer = {
    weather: {
              id: number, 
              main: string, 
              description: string, 
              icon: string
            },
    city: string,
    temp: number,
    feelsLike: number,
    sunset: number,
    humidity: number
};

type Crd = {
    lat: number,
    long: number
};

type Settings = {
  timeOfSunset: any,
  feelsLike: any,
  airHummidity: any
};


function App() {

  const [crd, setCrd] = useState<Crd>({
    lat: NaN,
    long: NaN,
  });

  const [weatherData, setWeatherData] = useState<WeatherFromServer>({
    weather: {
      id: NaN, 
      main: '', 
      description: '', 
      icon: ''
    },
    city: '',
    temp: NaN,
    feelsLike: NaN,
    sunset: NaN,
    humidity: NaN
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const settings: string | null = localStorage.getItem('settings')
    return settings ? JSON.parse(settings) : { timeOfSunset: false, feelsLike: false, airHummidity: false}})

  function getCoord(pos: any) {
    setCrd({ 
            lat: pos.coords.latitude, 
            long: pos.coords.longitude
          }) 
  };

  const getWeather = async () => {
    if (crd.lat && crd.long)
    {    
    const request = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.lat}&lon=${crd.long}&units=metric&lang=en&appid=${API_KEY}`;
    const response = await fetch(request);
    const weather = await response.json();
    console.log(weather);
    setWeatherData({weather: weather.weather[0], city: weather.name, temp: weather.main.temp, feelsLike: weather.main.feels_like, sunset: weather.sys.sunset, humidity: weather.main.humidity});
    } else { 
      return 
    };
  };

// getting local coordinates from browser API got some troubles with fetching from googleapis.com using chrome browser: (status 403)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCoord)
    console.log('fetching')
  }, [])


  
// getting current weather data from openwether.org using api 2.5 cause 3.0 requires subscribing on paid form
  useEffect(() => {
    getWeather()
  }, [crd])
  
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' 
               element={<LocaleWeather
                        settings={settings}
                        weather={weatherData.weather} 
                        city={weatherData.city}  
                        temp={weatherData.temp} 
                        feelsLike={weatherData.feelsLike} 
                        sunset={weatherData.sunset}
                        humidity={weatherData.humidity}
        />} />
        <Route path='/settings' element={ <Settings /> } />
        <Route path='/search' element={ <Search setCrd={setCrd} setSettings={setSettings}/> } />
        <Route path='/technical' element={ <Technical /> } />
      </Routes>
    </>
  )
}

export default App
