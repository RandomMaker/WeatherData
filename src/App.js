import React, {useState} from 'react'
import Map from "./Map";
import {Container} from "@material-ui/core";
import {AsyncMapSearch} from "./AsyncMapSearch";
import WeatherCard from "./WeatherCard";
import WeatherCardsList from "./WeatherCardsList";

function App() {
    const [location, setLocation] = useState([45, 45])
    return (
        <div>
            <Container maxWidth={"xl"}>
                <Map loct={location}/>
                <AsyncMapSearch onChange={data => {
                    setLocation(data)
                }}/>
                <WeatherCardsList loct={location}  />
            </Container>
        </div>
    )
}

export default App;
