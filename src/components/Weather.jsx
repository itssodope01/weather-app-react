import React, { useContext } from 'react';
import '../styles/components/Main.scss';
import CurrentWeather from './CurrentWeather.jsx';
import Forecast from './Forecast.jsx';
import Loader from './Loader.jsx';
import WeatherContext from '../context/weather.context.jsx';
import Place from './Place.jsx';
import useIsMobile from './useIsMobile.jsx';

const Main = () => {
  const { loading, currentWeather, dailyForecast, hourlyForecast } = useContext(WeatherContext);
  const isMobile = useIsMobile();

  return (
    <div
      className='Main'
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {isMobile && <Place />}
      {loading ? (
        <Loader />
      ) : (
        <>
          <CurrentWeather data={currentWeather} />
          <Forecast type="Hourly" title="Hourly Forecast" data={hourlyForecast} />
          <Forecast type="Daily" title="21 Days Forecast" data={dailyForecast} />
        </>
      )}
    </div>
  );
};

export default Main;
