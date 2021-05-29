import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Avatar, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import './weatherCard.css'

export default function WeatherCard({weather_data}) {
    return (
        <Card className={"root"}>
            <Typography variant={"h4"} align={"center"}>{timeConverter(weather_data.dt)}</Typography>
            <CardHeader
                avatar={
                    (<Avatar src={`http://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png`}/>)
                }
                title={weather_data.weather.map(weather => toProperCase(weather.description) + ". ")}
                subheader={`The high will be ${getTempInCelsius(weather_data.temp.max)}, the low will be ${getTempInCelsius(weather_data.temp.min)}.`}
            />
            <CardContent>
                <div className={"otherDetails"}>
                    <Typography>
                        Clouds: {weather_data.clouds}%
                        Wind: {`${weather_data.wind_speed}m/s ${degToCompass(weather_data.wind_deg)} `}
                        Pressure: {weather_data.pressure}hPa
                    </Typography>
                    <Typography>
                        Humidity: {weather_data.humidity}%
                        UV: {weather_data.uvi}UVI
                        Dew point: {getTempInCelsius(weather_data.dew_point)}
                    </Typography>
                </div>
                <div className={"temperatureDetails"}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="right">Morning</TableCell>
                                <TableCell align="right">Afternoon</TableCell>
                                <TableCell align="right">Evening</TableCell>
                                <TableCell align="right">Night</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Temperature
                                </TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.temp.morn)}</TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.temp.day)}</TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.temp.eve)}</TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.temp.night)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Feels Like
                                </TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.feels_like.morn)}</TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.feels_like.day)}</TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.feels_like.eve)}</TableCell>
                                <TableCell align="right">{getTempInCelsius(weather_data.feels_like.night)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className={"su-sn-details"}>

                    <Table className={"sunrise-sunset-table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell>SUNRISE</TableCell>
                                <TableCell>SUNSET</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{getDateTime(weather_data.sunrise)}am</TableCell>
                                <TableCell>{getDateTime(weather_data.sunset)}pm</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

function getDateTime(unixTime) {

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unixTime * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();

    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2)
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    return date + ' ' + month + ' ' + year;
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

const toProperCase = function (string) {
    return string.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
