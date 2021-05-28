import React, {useState} from 'react'
import Map from "./Map";
import {Container} from "@material-ui/core";
import {AsyncMapSearch} from "./AsyncMapSearch";
import WeatherCard from "./WeatherCard";

function App() {
    const [location, setLocation] = useState([45, 45])
    return (
        <div>
            <Container maxWidth={"md"}>
                <Map loct={location}/>
                <AsyncMapSearch onChange={data => {
                    setLocation(data)
                }}/>
                <WeatherCard/>
            </Container>
        </div>
    )
}

export default App;
