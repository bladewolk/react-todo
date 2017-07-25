import React from 'react'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const styles = {
    block: {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 16,
    },
    thumb: {
        backgroundColor: '#4DB6AC',
    },
    trackOff: {
        backgroundColor: '#B2DFDB',
    },
    trackSwitched: {
        backgroundColor: '#B2DFDB',
    }
};

const Switcher = ({filter, handleFilter, disabled}) => (
    <div className="switcher">
        <MuiThemeProvider>
            <Toggle
                thumbStyle={styles.thumb}
                trackStyle={styles.trackOff}
                onClick={handleFilter}
                disabled={!disabled}
                defaultToggled={filter}
                thumbSwitchedStyle={styles.thumb}
                trackSwitchedStyle={styles.trackSwitched}
            />
        </MuiThemeProvider>
    </div>
);


const Button = ({click, disabled}) => {
    return (
        <MuiThemeProvider>
            <FlatButton label="DISPATCH" primary={true} onClick={click} disabled={!disabled}/>
        </MuiThemeProvider>
    )
}

const Input = function({change, value, inputEnter, disabled}) {
    return (
        <MuiThemeProvider>
            <TextField
                hintText="Enter TODO"
                onChange={change}
                disabled={!disabled}
                onKeyPress={inputEnter}
                value={value}
            />
        </MuiThemeProvider>
    );
};

const Header = ({click, change, value, filter, handleFilter, fetched, inputEnter}) => {
    return (
        <div>
            <Input change={change} value={value} inputEnter={inputEnter} disabled={fetched}/>
            <Button click={click} disabled={fetched}/>
            <Switcher filter={filter} handleFilter={handleFilter} disabled={fetched}/>
        </div>
    )
}

export default Header
