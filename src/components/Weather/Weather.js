import React, { useState, useEffect } from "react";
import Weathercard from "./WeatherCard";
import "./style.css";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("Bengaluru");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a66a6202d1758026935ce1f8023dc14f`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
                                      
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });

  return (
    <>
    <div className="Wrapper">
      <div className="wrap">      
    <h2>Search Your City Here</h2>

        <div className="search">
          <input 
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
      </div>
    </>
  );
};
export default Weather