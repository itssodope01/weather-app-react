import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import './styles/components/App.scss';
import { useContext } from 'react';
import ThemeContext from './context/theme.context';

function App() {

  const darkMode = useContext(ThemeContext).dark;

  return (
    <div className={`App-${darkMode ? 'dark' : 'light'}`}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
