import React, { useState, useEffect, useContext } from 'react';
import '../styles/components/Forecast.scss';
import HourlyForecastWidget from './HourlyForecastWidget';
import DailyForecastWidget from './DailyForecastWidget';
import HorizontallyScrollable from './HorizontallyScrollable';
import WeatherContext from '../context/weather.context';
import { DateTime } from 'luxon';

const Forecast = ({ type, title, data }) => {
    const { place } = useContext(WeatherContext);
    const [currentHour, setCurrentHour] = useState(null);
    const [currentDay, setCurrentDay] = useState(null);

    useEffect(() => {
        const currentTime = DateTime.now().setZone(place.timezone).set({ minute: 0 }).toLocaleString(DateTime.TIME_SIMPLE);
        setCurrentHour(currentTime);

        const currentDayTime = DateTime.now().setZone(place.timezone).toLocaleString({ weekday: 'short', day: '2-digit', month: '2-digit' });
        setCurrentDay(currentDayTime);
    }, [place.timezone]);

    return (
        <div className='Forecast'>
            <div className="forecast-container">
                <HorizontallyScrollable className="widget-container">
                    {data.map((singleData) => (
                        <div key={singleData.date || singleData.day}>
                            {type === 'Hourly' ?
                                (<HourlyForecastWidget data={singleData} currentHour={currentHour} />) :
                                (<DailyForecastWidget data={singleData} currentDay={currentDay} />)
                            }
                        </div>
                    ))}
                </HorizontallyScrollable>
            </div>
        </div>
    );
};

export default Forecast;
