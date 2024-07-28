# Weather App

### Deployed: [React Weather App](https://itssodope01.github.io/react-weather-app/)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Optimization](#api-optimization)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Weather App is a React-based application that provides current weather information, hourly forecasts, and a 21-day daily forecast for any location. It automatically detects the user's location and displays the local weather conditions. Users can also search for weather information for different locations. The app features a dark/light mode, changes units based on user preference, and provides comprehensive weather details including precipitation, humidity, UV index, cloud cover, and visibility.

## Features
- **Dark/Light Mode**: The app supports both dark and light modes, automatically adjusting based on system preferences or user settings.
- **Unit Conversion**: Users can switch between different measurement systems (auto, metric, US, UK, CA).
- **Automatic Location Detection**: The app automatically loads weather information based on the user's current location.
- **Local Time**: Displays the local time of the searched or detected location.
- **Hourly Forecast**: Provides weather information on an hourly basis.
- **21-Day Daily Forecast**: Displays a daily weather forecast for up to 21 days.
- **Current Weather Details**: Shows current precipitation, humidity, UV index, cloud cover, and visibility.
- **Location Search**: Users can search for and select different locations to view their weather data.

## Technologies Used
- **React**: For building the user interface.
- **SCSS**: For styling components.
- **React Hooks**: `useState`, `useEffect`, `useContext`, `useRef` for state management and side effects.
- **Axios**: For making API requests.
- **Luxon**: For weather location's local time.

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
* Node.js (v14 or higher)
* npm (v6 or higher) or yarn
* Basic knowledge of React, SCSS, and working with APIs

### Installation
1. Clone the repository:

```
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Install the dependencies:

```
npm install
# or
yarn install
```

This command will install all necessary dependencies, including React, SCSS, Axios, and Luxon.

3. If you need to install any of these dependencies manually, you can do so with the following commands:

```
npm install node-sass axios luxon
# or
yarn add node-sass axios luxon
```

4. Create a `.env` file in the root directory and add your Meteosource API key:

```
REACT_APP__API_KEY_1=your_api_key_here
REACT_APP__API_KEY_2=your_api_key_here
REACT_APP__API_KEY_3=your_api_key_here
```

### Usage
1. Start the development server:

```
npm start
# or
yarn start
```

2. Open http://localhost:3000 to view it in the browser.

## API Optimization
To reduce the number of API calls and improve the efficiency of data fetching, several optimization strategies have been implemented:

- **Caching**: Weather data is cached in the local storage for a specified duration (60 minutes in the current implementation). Before making an API call, the application checks if valid cached data exists and uses it if available.
- **Geolocation Optimization**: To minimize unnecessary API calls when determining the user's location, the application only makes the searchNearestPlace function API call if the user's latitude and longitude have changed significantly (by more than 800 meters) since the last recorded position. This is calculated using the Haversine formula, which accounts for the Earth's curvature and provides an accurate distance between two points on the globe.
- **Debouncing**: The search input for locations uses debouncing to limit the number of API calls when a user types rapidly.
- **Search Results Caching**: The last 100 searched places and their results are cached in local storage. When a user searches for a place, the application first checks the cache for previous results. If found, it uses the cached results instead of making a new API call. This significantly reduces the number of API calls for frequently searched places.

By implementing these strategies, the application ensures efficient use of API resources, providing a smoother and faster user experience.


## API Reference
This project uses the Meteosource Weather API to fetch weather data. You can find more information and sign up for an API key at the [Meteosource Weather API page](https://rapidapi.com/MeteosourceWeather/api/ai-weather-by-meteosource).

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-new-feature`.
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.
