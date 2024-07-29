import React, { useContext } from 'react';
import WeatherIcon from './WeatherIcon.jsx';
import WeatherContext from '../context/weather.context.jsx';
import '../styles/components/CurrentWeather.scss';

const CurrentWeather = ({data}) => {

    const {
        cloud_cover,
        feels_like,
        humidity,
        icon_num,
        precipitation,
        summary,
        temperature,
        uv_index,
        visibility,
        wind,
    } = data;

    const { units } = useContext(WeatherContext);

    const otherInfoWidgets = [
        {
          id: 0,
          icon: 'fas fa-tint',
          name: 'Precipitation',
          value: Math.round(precipitation.total),
          unit: units.precipitation,
        },
        {
          id: 1,
          icon: 'fas fa-wind',
          name: 'Wind',
          value: Math.round(wind.speed),
          unit: units.wind_speed,
        },
        {
          id: 2,
          icon: 'fas fa-leaf',
          name: 'Humidity',
          value: Math.round(humidity),
          unit: units.humidity,
        },
        {
          id: 3,
          icon: 'fas fa-bolt',
          name: 'UV index',
          value: Math.round(uv_index),
          unit: units.uv_index,
        },
        {
          id: 4,
          icon: 'fas fa-cloud',
          name: 'Clouds cover',
          value: Math.round(cloud_cover),
          unit: units.cloud_cover,
        },
        {
          id: 5,
          icon: 'fas fa-eye',
          name: 'Visibility',
          value: Math.round(visibility),
          unit: units.visibility,
        },
      ];


    return (
        <div className='CurrentWeather'>
            <div className="temperature">
                <div className="weather-icon">
                <WeatherIcon iconNumber={icon_num} summary={summary} />
                </div>
                <div className="value">
                    <div className="real">{Math.round(temperature)} {units.temperature}</div>
                    <div className="feels-like">feels like {Math.round(feels_like)} {units.temperature}</div>
                </div>
                <div className="summary">{summary}</div>
            </div>
            <div className="other-infos">
            {otherInfoWidgets.map(({ id, name, icon, value, unit }) => (
          <div className='widget' key={id}>
            <div className='widget-container'>
              <div className='info'>
                <div className='icon'>
                  <i className={`${icon}`}></i>
                </div>
                <div className='value'>
                  {value} {unit}
                </div>
              </div>
              <div className='name'>{name}</div>
            </div>
          </div>
        ))}
            </div>
        </div>
    );
};

export default CurrentWeather;