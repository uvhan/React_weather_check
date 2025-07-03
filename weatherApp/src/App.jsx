import { useState, useEffect } from 'react';
import search from './assets/search.png';
import clear from './assets/clear.jpeg';
import cloudy from './assets/cloudy.jpeg';
import drizzle from './assets/drizzle.jpeg';
import humid from './assets/humid.jpeg';
import rain from './assets/rain.jpeg';
import snow from './assets/snow.jpeg';
import wind from './assets/wind.jpeg';

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, windy }) => {
  return (
    <>
      <div className='image'><img src={icon} alt="weather icon" /></div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className='country'>{country}</div>

      <div className="cord">
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='lon'>Longitude</span>
          <span>{lon}</span>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={humid} alt="humidity" className='icon' />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className='icon' />
          <div className="data">
            <div className="wind-percentage">{windy} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const api_key = "ebb73c13b3381743f3769890303831e1";
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(clear);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("India");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumid] = useState(0);
  const [windy, setWind] = useState(0);

  const Search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        alert("City not found!");
        return;
      }

      const data = await res.json();

      setHumid(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);

      // Set appropriate weather icon
      const weatherMain = data.weather[0].main.toLowerCase();
      switch (weatherMain) {
        case "clouds":
          setIcon(cloudy);
          break;
        case "clear":
          setIcon(clear);
          break;
        case "rain":
          setIcon(rain);
          break;
        case "drizzle":
          setIcon(drizzle);
          break;
        case "snow":
          setIcon(snow);
          break;
        case "mist":
        case "haze":
        case "fog":
          setIcon(humid);
          break;
        default:
          setIcon(clear);
          break;
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const HandleCity = (e) => {
    setText(e.target.value);
  };

  const HandleKeyDown = (e) => {
    if (e.key === "Enter") {
      Search();
    }
  };

  // Auto-fetch Chennai weather on load
  useEffect(() => {
    Search();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input
            type="text"
            className='cityInput'
            placeholder='Search city'
            onChange={HandleCity}
            value={text}
            onKeyDown={HandleKeyDown}
          />
          <div className='search-icon' onClick={Search}>
            <img src={search} alt="search" />
          </div>
        </div>

        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          lon={lon}
          humidity={humidity}
          windy={windy}
        />

        <p className='copyright'>
          [Designed By Uvhan_SG]
        </p>
      </div>
    </>
  );
}

export default App;
