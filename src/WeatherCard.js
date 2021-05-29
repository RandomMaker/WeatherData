import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: "lightseagreen",
        margin: 20,
        width: 'min-content',
        color: "whitesmoke",
        fontFamily: "monospace"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export function SimpleCard() {
    const classes = useStyles();
    // const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    {/*be{bull}nev{bull}o{bull}lent*/}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {/*adjective*/}
                </Typography>
                <Typography variant="body2" component="p">
                    {/*well meaning and kindly.*/}
                </Typography>
            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button size="small">Learn More</Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}


export default function WeatherCard({weather_data}) {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <h2>Todays temp: {weather_data.temperature}</h2>
                <h2>Sunrise at: {weather_data.sunrise}</h2>
                <h2>Sunset at: {weather_data.sunset}</h2>
                <h2>Feels Like: {weather_data.feels_like}</h2>
                <h2>Pressure: {weather_data.pressure}</h2>
                <h2>Humidity: {weather_data.humidity}</h2>
                <h2>Clouds: {weather_data.clouds}</h2>
                <h2>Uv Index: {weather_data.uvIndex}</h2>
                <h2>Visibility: {weather_data.visibility}</h2>
                <h2>Wind speed: {weather_data.wind_speed}</h2>
                <h2>Wind deg: {weather_data.wind_deg}</h2>
            </CardContent>
        </Card>
    )
}