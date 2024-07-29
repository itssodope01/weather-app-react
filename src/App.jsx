import Header from './components/Header.jsx';
import Weather from './components/Weather.jsx';
import './styles/components/App.scss';
import { useContext } from 'react';
import ThemeContext from './context/theme.context.jsx';
import WeatherContext from './context/weather.context.jsx';

function App() {
  const darkMode = useContext(ThemeContext).dark;
  const { apiError } = useContext(WeatherContext);

  return (
    <div className={`App-${darkMode ? 'dark' : 'light'}`}>
      {apiError ? (
        <div className="error-message">{apiError}</div>
      ) : (
        <>
          <Header />
          <Weather />
        </>
      )}
    </div>
  );
}

export default App;
