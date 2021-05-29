// Let's import React, our styles and React Async
import React, {useEffect} from 'react';
import Async from 'react-async';
import {LinearProgress} from "@material-ui/core";
import WeatherCard from "./WeatherCard";

// This is the API we'll use to request user data
const loadUsers = (lat, lng) =>
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=d2ae028a0370146905f1dae2e2a3dc0c&exclude=minutely,hourly`)
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())

// Our App component
function WeatherCardList({loct}) {

    useEffect(() => {
        console.log(`Hey these are the lats and lngs: ${loct[0]} ${loct[1]}`)
    }, [loct])

    return (
        <div className="container">
            <Async promiseFn={() => loadUsers(loct[0], loct[1])}>
                <Async.Loading>
                    <LinearProgress/>
                </Async.Loading>
                <Async.Fulfilled>
                    {data => {
                        return (
                            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                                <WeatherCard weather_data={extractDetails(data.current)}/>
                                {data.daily.map(dailyData => (
                                    <WeatherCard weather_data={extractDetails(dailyData)}/>
                                ))}
                            </div>
                        )
                    }}
                </Async.Fulfilled>
                <Async.Rejected>
                    {error => `Something went wrong: ${error.message}`}
                </Async.Rejected>
            </Async>
        </div>
    );
}

function extractDetails(object) {
    const weather_data = {}
    weather_data.temperature = getTempInCelsius(object.temp)
    weather_data.sunrise = timeConverter(object.sunrise)
    weather_data.sunset = getDateTime(object.sunset)
    weather_data.feels_like = getTempInCelsius(object.feels_like)
    weather_data.pressure = object.pressure + ' hPa'
    weather_data.humidity = object.humidity + '%'
    weather_data.clouds = object.clouds + '%'
    weather_data.uvIndex = object.uvi + ' UVI'
    weather_data.visibility = object.visibility + 'm'
    if (object.visibility >= 1000) {
        weather_data.visibility = object.visibility / 1000 + ' km'
    }
    weather_data.wind_speed = object.wind_speed + ' m/s'
    weather_data.wind_deg = degToCompass(object.wind_deg)
    return weather_data
}

function getDateTime(unixTime) {

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unixTime * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function getTempInCelsius(kelvin) {
    return Math.round((kelvin - 273)) + " °C"
}

function degToCompass(num) {
    const val = Math.trunc((Number(num) / 22.5) + 0.5)
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    console.log(val % 16)
    return arr[(val % 16)]
}

export default WeatherCardList;