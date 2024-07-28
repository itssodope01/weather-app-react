import React, { useContext, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import WeatherContext from '../context/weather.context';

const Place = () => {
    const { place } = useContext(WeatherContext);
    const [localTime, setLocalTime] = useState('');

    useEffect(() => {
        if (!place || !place.timezone) return;

        const updateTime = () => {
            const now = DateTime.now().setZone(place.timezone);
            setLocalTime(now.toLocaleString(DateTime.TIME_SIMPLE));
        };

        updateTime();
        const interval = setInterval(updateTime, 2000); 

        return () => clearInterval(interval); 
    }, [place]);

    if (!place) {
        return <div>Loading...</div>;
    }

    return (
        <div className='Place'>
            <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
            <span><b>{place.name}</b>, {place.country}
                <p style={{ marginTop: '5px' }}>
                    <i className="fas fa-regular fa-clock" style={{ marginRight: '8px' }}></i>{localTime}
                </p>
            </span>
        </div>
    );
};

export default Place;
