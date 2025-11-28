import React, { useEffect, useState,useRef } from 'react'
import "./Weather.css"
import search_icon from"../assets/vector-search-icon.jpg"
import cloud_icon from"../assets/cloud_icon.svg"
import clear_icon from"../assets/clear_icon.svg"
import drizzle_icon from"../assets/drizzle_icon.svg"
import rain_icon from"../assets/rain_icon.svg"
import snow_icon from"../assets/snow_icon.svg"
import wind_icon from"../assets/wind_icon.jpg"
import humidity_icon from"../assets/humidity_icon.jpeg"


const Weather = () => {
    const inputRef=useRef()
    console.log(import.meta.env.VITE_APP_ID)

    const [weatherData,setWeatherdata]=useState(false);

    const allIcons={
        "01d": clear_icon,
        "02d": clear_icon,
        "01n": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    };

    const search = async (city) => {
        if (city == ""){
            alert("Enter city name");
            return;
        };

        try {
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data= await response.json();
            console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            setWeatherdata({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            console.error("Error in fetching the data ");

            setWeatherdata(false);
           
        }
      };
    useEffect(()=>{
        search("New York");
    },[]);
  return (
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search..." defaultValue="" autoComplete='off'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData&&(<>
         <img src={weatherData.icon} alt="" className="Weather_icon"/>
        <p className="temperature">{weatherData.temperature}°c</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather_data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windspeed}</p>
                    <span>Wind speed</span>
                </div>
            </div>
        </div>

        </>)}
        
    </div>
    
  );
};

export default Weather;