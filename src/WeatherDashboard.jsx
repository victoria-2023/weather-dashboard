import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherDashboard.css";

// TODO: Replace with your OpenWeatherMap API key
const API_KEY = "f968c650ac649b1d46ee70246f938efa";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    // Load last searched city from localStorage
    const savedCity = localStorage.getItem("lastSearchedCity");
    if (savedCity) {
      fetchWeather(savedCity);
    }
  }, [unit]);

  const fetchWeather = async (cityName) => {
    if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
      setError("Please set up your OpenWeatherMap API key");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      localStorage.setItem("lastSearchedCity", cityName);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else if (err.response?.status === 401) {
        setError("Invalid API key. Please check your configuration.");
      } else {
        setError("Unable to fetch weather data. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
          );
          
          const forecastResponse = await axios.get(
            `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
          );

          setWeather(response.data);
          setForecast(forecastResponse.data);
          setCity(response.data.name);
          localStorage.setItem("lastSearchedCity", response.data.name);
        } catch (err) {
          setError("Unable to fetch weather for your location");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        let errorMessage = "Unable to get your location. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
            break;
        }
        setError(errorMessage);
      }
    );
  };

  const toggleUnit = (newUnit) => {
    if (unit !== newUnit) {
      setUnit(newUnit);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const getDailyForecast = () => {
    if (!forecast) return [];
    
    const dailyData = {};
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          ...item,
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
        };
      } else {
        if (item.main.temp_max > dailyData[date].temp_max) {
          dailyData[date].temp_max = item.main.temp_max;
        }
        if (item.main.temp_min < dailyData[date].temp_min) {
          dailyData[date].temp_min = item.main.temp_min;
        }
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const getHourlyForecast = () => {
    if (!forecast) return [];
    return forecast.list.slice(0, 8); // Next 24 hours (8 x 3-hour intervals)
  };

  return (
    <div className="weather-dashboard">
      <header className="header">
        <h1>
          <i className="fas fa-cloud-sun"></i> Weather Dashboard
        </h1>
        <p>Get real-time weather information for any city</p>
      </header>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </form>
        
        <button onClick={getCurrentLocation} className="location-btn">
          <i className="fas fa-location-arrow"></i> Use Current Location
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      )}

      {weather && !loading && (
        <div className="weather-container">
          {/* Current Weather */}
          <div className="current-weather">
            <div className="weather-main">
              <div className="weather-info">
                <h2>{weather.name}, {weather.sys.country}</h2>
                <p>{new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}</p>
                <div className="temperature">
                  <span className="temp">{Math.round(weather.main.temp)}°</span>
                  <div className="temp-unit">
                    <button
                      className={unit === "metric" ? "unit-btn active" : "unit-btn"}
                      onClick={() => toggleUnit("metric")}
                    >
                      °C
                    </button>
                    <button
                      className={unit === "imperial" ? "unit-btn active" : "unit-btn"}
                      onClick={() => toggleUnit("imperial")}
                    >
                      °F
                    </button>
                  </div>
                </div>
                <p className="description">{weather.weather[0].description}</p>
              </div>
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <i className="fas fa-eye"></i>
                <span>Visibility</span>
                <span>{(weather.visibility / 1000).toFixed(1)} km</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-tint"></i>
                <span>Humidity</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-wind"></i>
                <span>Wind Speed</span>
                <span>{weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-thermometer-half"></i>
                <span>Feels Like</span>
                <span>{Math.round(weather.main.feels_like)}°{unit === "metric" ? "C" : "F"}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-compress-arrows-alt"></i>
                <span>Pressure</span>
                <span>{weather.main.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-sun"></i>
                <span>UV Index</span>
                <span>N/A</span>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="forecast-section">
            <h3><i className="fas fa-calendar-alt"></i> 5-Day Forecast</h3>
            <div className="forecast-container">
              {getDailyForecast().map((day, index) => (
                <div key={index} className="forecast-item">
                  <div className="forecast-date">{formatDate(day.dt)}</div>
                  <img
                    className="forecast-icon"
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                  />
                  <div className="forecast-temps">
                    <span className="forecast-high">{Math.round(day.temp_max)}°</span>
                    <span className="forecast-low">{Math.round(day.temp_min)}°</span>
                  </div>
                  <div className="forecast-desc">{day.weather[0].description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="hourly-section">
            <h3><i className="fas fa-clock"></i> Hourly Forecast</h3>
            <div className="hourly-container">
              {getHourlyForecast().map((hour, index) => (
                <div key={index} className="hourly-item">
                  <div className="hourly-time">{formatTime(hour.dt)}</div>
                  <img
                    className="hourly-icon"
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                    alt={hour.weather[0].description}
                  />
                  <div className="hourly-temp">{Math.round(hour.main.temp)}°</div>
                  <div className="hourly-desc">{hour.weather[0].description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
