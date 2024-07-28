import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

async function makeRequest(options) {
    console.log('Making request with API');
    try {
        options.headers['x-rapidapi-key'] = API_KEY;
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Rate limit exceeded
            console.log('API Limit exceeded');
        } else {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

async function getWeatherData(endpoint, place_id, measurementSystem) {
    const options = {
        method: 'GET',
        url: `https://ai-weather-by-meteosource.p.rapidapi.com/${endpoint}`,
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
        url: 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places',
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
        url: 'https://ai-weather-by-meteosource.p.rapidapi.com/nearest_place',
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
