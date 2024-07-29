import React, { useContext, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import WeatherIcon from './WeatherIcon.jsx';
import WeatherContext from '../context/weather.context.jsx';

const HourlyForecastWidget = ({ data, currentHour }) => {
    const { date, icon, summary, temperature, precipitation, wind } = data;
    const { units, place } = useContext(WeatherContext);

    const [currentTime, setCurrentTime] = useState(DateTime.now().setZone(place.timezone));

    useEffect(() => {
        const updateTime = () => setCurrentTime(DateTime.now().setZone(place.timezone));
        let interval;
        clearInterval(interval);
        updateTime();
        interval = setInterval(updateTime, 4200);
        return () => clearInterval(interval);
    }, [place.timezone]);

    const nowDate = {
        day: currentTime.toLocaleString({ weekday: 'short', day: '2-digit', month: '2-digit' }),
        time: currentTime.set({ minute: 0 }).toLocaleString(DateTime.TIME_SIMPLE),
    };

    const weatherDate = DateTime.fromISO(date, { zone: place.timezone });
    const weather_date = {
        day: weatherDate.toLocaleString({ weekday: 'short', day: '2-digit', month: '2-digit' }),
        time: weatherDate.set({ minute: 0 }).toLocaleString(DateTime.TIME_SIMPLE),
    };

    const midnightTime = currentTime.set({ hour: 0, minute: 0 }).toLocaleString(DateTime.TIME_SIMPLE);

    const displayDay =
        weather_date.day === nowDate.day && weather_date.time === nowDate.time && currentHour === weather_date.time
            ? 'Now'
            : weather_date.time === midnightTime
            ? weather_date.day
            : '';

    return (
        <div className="widget">
            <div className="day">
                {displayDay}
            </div>
            <div className="time">
                {weather_date.time}
            </div>
            <div className="icon-temp">
                <div className="icon">
                    <WeatherIcon iconNumber={icon} summary={summary} />
                </div>
                <div className="temperature">
                    {Math.round(temperature)} {units.temperature}
                </div>
            </div>
            <div className="precipitation">
                {Math.round(precipitation.total)} {units.precipitation}
            </div>
            <div className="wind">
                <div className="speed">
                    {Math.round(wind.speed)} {units.wind_speed}
                </div>
                <div className="direction">
                    <i 
                        className="fas fa-location-arrow" 
                        style={{ transform: `rotate(${-45 + wind.angle}deg)`, marginLeft: '6px' }}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default HourlyForecastWidget;
