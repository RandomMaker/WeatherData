import React, {useState} from 'react'
import Map from "./Map";
import {Container} from "@material-ui/core";
import {AsyncMapSearch} from "./AsyncMapSearch";
import WeatherCardsList from "./WeatherCardsList";

function App() {
    const [location, setLocation] = useState([45, 45])
    const [name, setName] = useState('')
    return (
        <div>
            <Container maxWidth={"xl"}>
                <Map loct={location} name={name}/>
                <AsyncMapSearch onChange={([name, location]) => {
                    setLocation(location)
                    setName(name)
                }}/>
                <WeatherCardsList location={location} name={name}/>
            </Container>

        </div>
    )
}

export default App;
