import { FC } from 'react'

import { WeatherFromServer } from '../../App'
import { GlobalSvgSelector } from '../../assets/icons/global'
import { IndicatorSvgSelector } from '../../assets/icons/indicator'


const convertTime = (timestamp: WeatherFromServer['sunset']): string => {
  const date = new Date(timestamp * 1000)
  return `time of sunset at ${date.getHours()}:${date.getMinutes()}`  
}
type WeatherFromServerWithSettings = {
  weather: WeatherFromServer['weather'],
  city: WeatherFromServer['city'],
  temp: WeatherFromServer['temp'],
  feelsLike: WeatherFromServer['feelsLike'],
  sunset: WeatherFromServer['sunset'],
  humidity: WeatherFromServer['humidity']
  settings: {
    timeOfSunset: boolean
    feelsLike: boolean,
    airHummidity: boolean
  }

}

export const LocaleWeather: FC<WeatherFromServerWithSettings> = ({ weather, city, temp, feelsLike, sunset, humidity, settings}) => {
  return (
    <div className='container mx-auto max-w-[500px] pt-5 space-y-6'>
      <div className='text-xl'>
        {`Today: ${new Date(sunset * 1000).toDateString()}`}
      </div>
      <div className='flex text-4xl space-x-4'>
        <GlobalSvgSelector id='location' /> {city}
      </div>
      <div className='flex text-3xl'>
        <GlobalSvgSelector id={weather.description}/>{weather.description}
      </div>
      <div className='flex text-3xl items-center space-x-4'>
      <IndicatorSvgSelector id='temp'/>{ Math.round(temp) + " ºC" } 
      </div>
      {settings.feelsLike && <div className='flex text-xl items-center'>
        {`feels like: ${ Math.round(feelsLike)}  ºC` }
      </div>}
      {settings.airHummidity && <div className='flex text-xl space-x-4'>
        <IndicatorSvgSelector id='humidity'/><div className='ml-2'>{`humidity is: ${humidity} %`}</div>
      </div>}
      {settings.timeOfSunset && <div className='flex text-xl items-center'>
      <IndicatorSvgSelector id='sunset'/>{convertTime(sunset)}
      </div>}
      
    </div>
  )
}
