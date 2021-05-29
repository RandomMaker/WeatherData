import React, {useEffect, useState} from 'react'
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import './map.css'

function Map({loct, name}) {

    const [location, setLocation] = useState([50, 50])

    useEffect(() => {
        setLocation(loct)
        console.log(`Hey these are the lats and lngs: ${loct[0]} ${loct[1]}`)
    }, [loct])

    return (

        <div>
            <MapContainer
                center={location}
                id={"mapContainer"}
                zoom={10}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location}>
                    <Popup>
                        {name}
                    </Popup>
                </Marker>
                <SetViewOnClick location={location}/>
            </MapContainer>
        </div>
    );
}

function SetViewOnClick({location}) {
    const map = useMap()
    map.setView(location, 10)
    return null
}


export default Map;
