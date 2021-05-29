// Let's import React, our styles and React Async
import React, {useEffect} from 'react';
import Async from 'react-async';
import {LinearProgress, Typography} from "@material-ui/core";
import WeatherCard from "./WeatherCard";

// This is the API we'll use to request user data
const loadLocations = (lat, lng) =>
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=d2ae028a0370146905f1dae2e2a3dc0c&exclude=minutely,hourly`)
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())

// Our App component
function WeatherCardList({location}) {

    useEffect(() => {
        console.log(`Hey these are the lats and lngs: ${location[0]} ${location[1]}`)
    }, [location])

    return (
        <div className="container">
            <Async promiseFn={() => loadLocations(location[0], location[1])}>
                <Async.Loading>
                    <LinearProgress/>
                </Async.Loading>
                <Async.Fulfilled>
                    {data => {
                        return (
                            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                                {data.daily.map(dailyData => (
                                    <WeatherCard weather_data={dailyData}/>
                                ))}
                            </div>
                        )
                    }}
                </Async.Fulfilled>
                <Async.Rejected>
                    {error => (
                        <div>
                            <Typography variant={"h1"}>Oops! Something went wrong.</Typography>
                            <Typography variant={"h4"}>Error: {error}</Typography>
                        </div>
                    )}
                </Async.Rejected>
            </Async>
        </div>
    );
}

export default WeatherCardList;