import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const apikey = "313672dbfdeebf09aa9ff48a234f0c77";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // const imgIcon = `https://openweathermap.org/img/wn/50d@2x.png`;
  // console.log(weatherData);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, do MMMM");

  return (
    <>
      <div className="weatherContainer">
        <div className="part1">
          <div className="weatherDetails">
            {/* <p className="now"> */}
            {weatherData && weatherData.weather && weatherData.weather[0] ? (
              <p className="now">{weatherData.weather[0].description}</p>
            ) : (
              <p className="now">Loading weather data...</p>
            )}
            {/* </p> */}
            {weatherData && <h3 className="temp">{weatherData.main.temp}°C</h3>}
          </div>
          <img
            className="weatherimg"
            src={
              weatherData && weatherData.weather && weatherData.weather[0]
                ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
                : "loading"
            }
          />
        </div>
        <div className="part2">
          <div className="dateContainer">
            <img className="dateimg" src="/calendar.png" />
            <p className="date">{formattedDate}</p>
          </div>
          <div className="locationContainer">
            <img className="locationimg" src="/location.png" />
            <p className="location">
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.name
                : "loading"}
              (
              {location
                ? `${location.latitude}, ${location.longitude}`
                : "Loading location..."}
              )
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
