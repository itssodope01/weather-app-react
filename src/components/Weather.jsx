import React, { useContext } from 'react';
import '../styles/components/Main.scss';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Loader from './Loader';
import WeatherContext from '../context/weather.context';
import Place from './Place';
import useIsMobile from './useIsMobile';

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
