import React, { useContext, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import WeatherIcon from './WeatherIcon.jsx';
import WeatherContext from '../context/weather.context.jsx';

const DailyForecastWidget = ({ data, currentDay }) => {
    const { day, icon, summary, temperature_max, temperature_min, precipitation } = data;
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

    const nowDate = currentTime.toLocaleString({ weekday: 'short', day: '2-digit', month: '2-digit' });
    const weatherDate = DateTime.fromISO(day, { zone: place.timezone });
    const weather_date = weatherDate.toLocaleString({ weekday: 'short', day: '2-digit', month: '2-digit' });

    const displayDay = nowDate === weather_date && currentDay === nowDate ? 'Today' : weather_date;

    return (
        <div className="widget">
            <div className="day">
                {displayDay}
            </div>
            <div className="icon-temp">
                <div className="icon">
                    <WeatherIcon iconNumber={icon} summary={summary} />
                </div>
                <div className="temperature">
                    <div className="max">
                        {Math.round(temperature_max)} {units.temperature}
                    </div>
                    <div className="min">
                        {Math.round(temperature_min)} {units.temperature}
                    </div>
                </div>
            </div>
            <div className="precipitation">
                {Math.round(precipitation.total)} {units.precipitation}
            </div>
        </div>
    );
};

export default DailyForecastWidget;
