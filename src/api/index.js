import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

async function makeRequest(options) {
  options.headers['x-rapidapi-key'] = API_KEY;
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error('API Limit exceeded');
    } else if (error.response && (error.response.status === 404 || error.response.status === 403 || error.response.status === 400)) {
      throw new Error('API Limit exceeded');
    } else {
      throw new Error('Error fetching data');
    }
  }
}

async function getWeatherData(endpoint, place_id, measurementSystem) {
  const options = {
    method: 'GET',
    url: `/api/${endpoint}`,
    params: {
      place_id: place_id,
      timezone: 'auto',
      language: 'en',
      units: measurementSystem,
    },
    headers: {
      'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com'
    }
  };

  return await makeRequest(options);
}

async function searchPlace(place) {
  const options = {
    method: 'GET',
    url: '/api/find_places',
    params: {
      text: place,
      language: 'en'
    },
    headers: {
      'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com'
    }
  };

  return await makeRequest(options);
}

async function searchNearestPlace(lat, lon) {
  const options = {
    method: 'GET',
    url: '/api/nearest_place',
    params: {
      lat: lat.toString(),
      lon: lon.toString(),
      language: 'en'
    },
    headers: {
      'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com'
    }
  };

  return await makeRequest(options);
}

export { getWeatherData, searchPlace, searchNearestPlace };
