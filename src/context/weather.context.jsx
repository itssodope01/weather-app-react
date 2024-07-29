import { createContext, useEffect, useState } from "react";
import { DEFAULT_PLACE, MEASUREMENT_SYSTEMS, UNITS } from "../utils";
import { getWeatherData, searchNearestPlace } from "../api";

const WeatherContext = createContext();

const CACHE_KEY_BASE = 'weatherData';
const CACHE_EXPIRY_KEY_BASE = 'weatherDataExpiry';
const CACHE_COORDS_KEY = 'cachedCoords';
const CACHE_DURATION = 60 * 60 * 1000;
const POSITION_CHANGE_THRESHOLD = 800;

const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3;

    const lat1 = toRad(coords1.latitude);
    const lon1 = toRad(coords1.longitude);
    const lat2 = toRad(coords2.latitude);
    const lon2 = toRad(coords2.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const WeatherProvider = ({ children }) => {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [measurementSystem, setMeasurementSystem] = useState(MEASUREMENT_SYSTEMS.auto);
    const [units, setUnits] = useState({});
    const [locationDetermined, setLocationDetermined] = useState(false);

    useEffect(() => {
        async function fetchUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const cachedCoords = JSON.parse(localStorage.getItem(CACHE_COORDS_KEY));

                    if (cachedCoords && haversineDistance(cachedCoords, { latitude, longitude }) < POSITION_CHANGE_THRESHOLD) {
                        setPlace(cachedCoords.place);
                    } else {
                        try {
                            const nearestPlace = await searchNearestPlace(latitude, longitude);
                            if (nearestPlace) {
                                setPlace(nearestPlace);
                                localStorage.setItem(CACHE_COORDS_KEY, JSON.stringify({ latitude, longitude, place: nearestPlace }));
                            } else {
                                setPlace(DEFAULT_PLACE);
                            }
                        } catch (error) {
                            console.error('Error searching nearest place:', error);
                            setPlace(DEFAULT_PLACE);
                        }
                    }
                    setLocationDetermined(true);
                }, (error) => {
                    console.error('Geolocation error:', error);
                    setPlace(DEFAULT_PLACE);
                    setLocationDetermined(true);
                }, {
                    timeout: 20000,
                });
            } else {
                setPlace(DEFAULT_PLACE);
                setLocationDetermined(true);
            }
        }

        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (!locationDetermined || !place) return;

        async function _getWeatherData() {
            setLoading(true);
            try {
                const now = Date.now();
                const CACHE_KEY = `${CACHE_KEY_BASE}_${place.place_id}_${measurementSystem}`;
                const CACHE_EXPIRY_KEY = `${CACHE_EXPIRY_KEY_BASE}_${place.place_id}_${measurementSystem}`;

                const cachedData = localStorage.getItem(CACHE_KEY);
                const cachedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

                if (cachedData && cachedExpiry && now < parseInt(cachedExpiry)) {
                    const data = JSON.parse(cachedData);
                    setCurrentWeather(data.current);
                    setHourlyForecast(data.hourly.data);
                    setDailyForecast(data.daily.data);
                    setUnits(UNITS[data.units]);
                } else {
                    const [cw, hf, df] = await Promise.all([
                        getWeatherData('current', place.place_id, measurementSystem),
                        getWeatherData('hourly', place.place_id, measurementSystem),
                        getWeatherData('daily', place.place_id, measurementSystem),
                    ]);

                    setCurrentWeather(cw.current);
                    setHourlyForecast(hf.hourly.data);
                    setDailyForecast(df.daily.data);
                    setUnits(UNITS[cw.units]);

                    const weatherData = { current: cw.current, hourly: hf.hourly, daily: df.daily, units: cw.units };
                    localStorage.setItem(CACHE_KEY, JSON.stringify(weatherData));
                    localStorage.setItem(CACHE_EXPIRY_KEY, now + CACHE_DURATION);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
            }
        }

        _getWeatherData();
    }, [place, measurementSystem, locationDetermined]);

    return (
        <WeatherContext.Provider 
            value={{
                place,
                setPlace, 
                loading,
                currentWeather,
                hourlyForecast,
                dailyForecast,
                measurementSystem,
                setMeasurementSystem,
                units,
            }}>
            {children}
        </WeatherContext.Provider>
    );
}

export { WeatherProvider };
export default WeatherContext;
