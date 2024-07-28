import React, { useState, useContext, useEffect, useRef } from 'react';
import '../styles/components/Search.scss';
import { searchPlace } from '../api';
import WeatherContext from '../context/weather.context';

const CACHE_KEY = 'searchCache';
const MAX_CACHE_SIZE = 100;

const loadCache = () => {
    const cache = localStorage.getItem(CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
};

const saveCache = (cache) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const updateCache = (cache, text, results) => {
    if (Object.keys(cache).length >= MAX_CACHE_SIZE) {
        const firstKey = Object.keys(cache)[0];
        delete cache[firstKey];
    }
    cache[text] = results;
    saveCache(cache);
};

function Search() {
    const [text, setText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [resultsVisible, setResultsVisible] = useState(false);
    const { setPlace } = useContext(WeatherContext);
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const cache = loadCache();
    const resultsRef = useRef(null);

    useEffect(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(async () => {
            if (text.trim() === '') {
                setSearchResults([]);
                setResultsVisible(false);
                return;
            }

            if (cache[text]) {
                setSearchResults(cache[text]);
                setResultsVisible(true);
            } else {
                const res = await searchPlace(text);
                setSearchResults(res);
                updateCache(cache, text, res);
                setResultsVisible(true);
            }
        }, 600);

        setDebounceTimeout(newTimeout);
    }, [text]);

    const onSearch = (e) => {
        setText(e.target.value);
    };

    const changePlace = (place) => {
        setPlace(place);
        setText('');
        setSearchResults([]);
        setResultsVisible(false);
    };

    const handleClickOutside = (event) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target)) {
            setResultsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='search-container'>
            <div className='search-icon'>
                <i className="fas fa-search" style={{ fontSize: '1.1rem' }}></i>
            </div>
            <div className='search-input'>
                <input 
                    type='text'
                    name='search-city'
                    placeholder='Search for a city' 
                    value={text}
                    onChange={onSearch}
                    onFocus={() => {
                        if (searchResults.length > 0) {
                            setResultsVisible(true);
                        }
                    }}
                />
            </div>
            {resultsVisible && (
                <div className="search-results" ref={resultsRef}>
                    <div className="results-container">
                        {
                            searchResults.length > 0 ? (
                                searchResults.map((place) => (
                                    <div
                                        className='result'
                                        key={place.place_id}
                                        onClick={() => changePlace(place)}
                                    >
                                        {place.name}, {place.adm_area1}, {place.country}
                                    </div>
                                ))    
                            ) : null
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
