// \nodebox\src\components\Search.jsx

import React, { useState } from "react";
import axios from "axios";
import "../styles/search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle typing in the input
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
      );
      setSuggestions(res.data); // array of matches
    } catch (err) {
      console.error("Geocoding failed:", err.message);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setWeather(res.data);
      setError("");
      setSuggestions([]); // clear dropdown
    } catch (err) {
      setError("Could not fetch weather.");
      setWeather(null);
    }
  };

  // Handle Enter key to select first suggestion
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      const first = suggestions[0];
      fetchWeatherByCoords(first.lat, first.lon);
    }
  };

  return (
    <>
      <div className="search-and-card">
        <div className="galaxy"></div>
        <div id="search-container">
          <div className="nebula"></div>
          <div className="starfield"></div>
          <div className="cosmic-dust"></div>
          <div className="cosmic-dust"></div>
          <div className="cosmic-dust"></div>
          <div className="stardust"></div>
          <div className="cosmic-ring"></div>

          <div id="main">
            <input
              className="input"
              name="text"
              type="text"
              placeholder="Enter a city"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            <ul className="suggestions">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => fetchWeatherByCoords(s.lat, s.lon)}
                >
                  {s.name}, {s.country}
                </li>
              ))}
            </ul>

            <div id="cosmic-glow"></div>
            <div className="wormhole-border"></div>

            <div
              id="wormhole-icon"
              onClick={() => {
                if (suggestions.length > 0) {
                  const first = suggestions[0];
                  fetchWeatherByCoords(first.lat, first.lon);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#a9c7ff"
                fill="none"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <circle r="10" cy="12" cx="12"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>

            <div id="search-icon">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="url(#cosmic-search)"
                fill="none"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <circle r="8" cy="11" cx="11"></circle>
                <line y2="16.65" x2="16.65" y1="21" x1="21"></line>
                <defs>
                  <linearGradient
                    gradientTransform="rotate(45)"
                    id="cosmic-search"
                  >
                    <stop stopColor="#a9c7ff" offset="0%"></stop>
                    <stop stopColor="#6e8cff" offset="100%"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {error && <div className="weather-error">{error}</div>}

        {weather && (
          <div className="cardContainerx">
            <div className="cardx">
              <p className="city">
                {weather.name}, {weather.sys?.country}
              </p>
              <p className="weather">{weather.weather[0].description}</p>

              {/* Weather icon */}
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />

              <p className="temp">{Math.round(weather.main.temp)}°C</p>

              <div className="minmaxContainer">
                <div className="min">
                  <p className="minHeading">Min</p>
                  <p className="minTemp">
                    {Math.round(weather.main.temp_min)}°C
                  </p>
                </div>
                <div className="max">
                  <p className="maxHeading">Max</p>
                  <p className="maxTemp">
                    {Math.round(weather.main.temp_max)}°C
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
