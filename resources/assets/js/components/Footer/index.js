import React from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
    done: {
        cursor: 'pointer',
        backgroundColor: '#8BC34A',
    },
    undone: {
        cursor: 'pointer',
        backgroundColor: '#00BCD4',
    },
}

const Item = ({item, onClick, drop}) => (
    <MuiThemeProvider>
        <AppBar style={item.done ? style.done : style.undone}
            title={<span>{item.text}</span>}
            onTitleTouchTap={onClick}
            iconElementLeft={<IconButton onClick={drop} ><NavigationClose /></IconButton>}
            // iconElementRight={<FlatButton label="Save" />}
        />
    </MuiThemeProvider>
);

const Footer = ({items, done, drop}) => {
    return (
        <div>
            {items.map((item, index) => {
                    return (<Item key={index} item={item} onClick={() => done(item.id)} drop={() => drop(item.id)} />)
            })}
        </div>
    )
}

export default Footer