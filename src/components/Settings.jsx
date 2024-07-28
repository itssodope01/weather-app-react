import React, { useContext, useState } from 'react';
import '../styles/components/Settings.scss';
import ThemeContext from '../context/theme.context';
import { MEASUREMENT_SYSTEMS } from '../utils';
import WeatherContext from '../context/weather.context';

const Settings = () => {
    const [openSettings, setOpenSettings] = useState(false);
    const { dark, setDark, saveTheme } = useContext(ThemeContext);
    const { measurementSystem, setMeasurementSystem } = useContext(WeatherContext);

    const toggleTheme = () => {
        setDark((prevDark) => !prevDark);
        saveTheme(!dark);
    };

    const setSystem = (system) => () => {
        setMeasurementSystem(system);
        setOpenSettings(false);
    };

    return (
        <div className='Settings'>
            <div className='theme-toggler'>
                <div className='theme-buttons' onClick={toggleTheme}>
                    <div className={`light-theme-btn ${dark ? '' : 'active'}`}>
                        <i className="fas fa-sun"></i>
                    </div>
                    <div className={`dark-theme-btn ${dark ? 'active' : ''}`}>
                        <i className="fas fa-moon"></i>
                    </div>
                </div>
            </div>
            <div className='settings-btn' onClick={() => setOpenSettings((prevVal) => !prevVal)}>
                <i className={`fa-solid fa-gear`}></i>
            </div>
            <div className={`settings-menu ${openSettings ? 'open' : ''}`}>
                <div className='measurement-systems'>
                    <h4>Measurement Systems:</h4>
                    <div className='systems'>
                        {Object.values(MEASUREMENT_SYSTEMS).map((system) => (
                            <div
                                className={`system ${measurementSystem === system ? 'active' : ''}`}
                                key={system}
                                onClick={setSystem(system)}
                            >
                                {system}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;