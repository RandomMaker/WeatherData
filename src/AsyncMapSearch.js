// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React, {useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';


export const AsyncMapSearch = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [textValue, setTextValue] = useState('')
    const loading = open && !options.includes(textValue)
    let nameNlocation = useRef([])

    const handleChange = (e) => setTextValue(e.target.value)

    const handleOptionsClose = (e) => {
        const selected = e.target.textContent || e.target.value
        console.log(nameNlocation)
        if (nameNlocation.current.map(nam => nam[0]).includes(selected)) {
            // alert('You hit me. ')
            const index = nameNlocation.current.map(nam => nam[0]).indexOf(selected)
            console.log(nameNlocation.current[index])
            props.onChange(nameNlocation.current[index][1])
        }
        setOpen(false)
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch(`http://api.geonames.org/searchJSON?name_startsWith=${textValue}&maxRows=5&username=sarwang`);
            const {geonames} = await response.json();
            const nameNlocatio = geonames.map((geoname) => {
                return [geoname['toponymName'], [geoname['lat'], geoname['lng']]]
            })

            if (active) {
                const names = nameNlocatio.map(nam => nam[0])
                nameNlocation.current = nameNlocatio
                // console.log(names)
                setOptions(names)
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, textValue]);


    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{width: 300}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={(e) => {
                handleOptionsClose(e)
            }}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search for a city"
                    variant="outlined"
                    onChange={(e) => handleChange(e)}
                    value={textValue}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}