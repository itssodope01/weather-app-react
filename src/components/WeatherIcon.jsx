import ThemeContext from "../context/theme.context";
import { useContext } from "react";

function WeatherIcon({ iconNumber, summary }) {
  const { dark } = useContext(ThemeContext);
    return (
      <img
        src={`src/assets/weather_icons/set0${dark ? '2' : '3'}/big/${iconNumber}.png`}
        alt={summary}
        draggable={false}
      />
    );
  }
  
  export default WeatherIcon;