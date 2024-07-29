import Header from './components/Header.jsx';
import Weather from './components/Weather.jsx';
import './styles/components/App.scss';
import { useContext } from 'react';
import ThemeContext from './context/theme.context.jsx';

function App() {

  const darkMode = useContext(ThemeContext).dark;

  return (
    <div className={`App-${darkMode ? 'dark' : 'light'}`}>
      <Header />
      <Weather />
    </div>
  );
}

export default App;
