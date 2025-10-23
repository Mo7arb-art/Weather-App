import React, { useState, useEffect } from "react";
import "../styles/Cards.css";

function Cards() {
  const [egyptWeather, setEgyptWeather] = useState(null);
  const [saudiWeather, setSaudiWeather] = useState(null);
  const [japanWeather, setJapanWeather] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchWeather = async (city, setter) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setter(data);
    };

    fetchWeather("Cairo", setEgyptWeather);
    fetchWeather("Riyadh", setSaudiWeather);
    fetchWeather("Tokyo", setJapanWeather);
  }, []);

  // Helper to render a card
  const renderCard = (weather, cityLabel) => {
    if (!weather || !weather.main || !weather.weather) return null;

    return (
      <div className="cardContainer">
        <div className="card">
          <p className="city">{cityLabel}</p>
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
              <p className="minTemp">{Math.round(weather.main.temp_min)}°C</p>
            </div>
            <div className="max">
              <p className="maxHeading">Max</p>
              <p className="maxTemp">{Math.round(weather.main.temp_max)}°C</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Cards">
      {renderCard(egyptWeather, "Cairo, EG")}
      {renderCard(saudiWeather, "Riyadh, SA")}
      {renderCard(japanWeather, "Tokyo, JP")}
    </div>
  );
}

export default Cards;
