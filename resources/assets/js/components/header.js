import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Header extends Component{

    handleClick(){
        if (this.text.value != '')
            this.props.actions.add(this.text.input.value)
        this.text.input.value = ''
    }
    handleDone(key){
        this.props.actions.done(key)
    }
    handleDrop(key){
        this.props.actions.del(key)
    }

    render(){
        const done = {
            backgroundColor: '#009688',
            cursor: 'pointer'
        }
        const undone = {
            backgroundColor: "#00BCD4",
            cursor: 'pointer'
        }
        return (
            <div>
                <MuiThemeProvider>
                    <TextField
                        hintText="Enter TODO"
                        ref={input => this.text = input}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <FlatButton label="DISPATCH" primary={true} onClick={this.handleClick.bind(this)}/>
                </MuiThemeProvider>
                    {/*{this.props.items.map((item,key)=>{*/}
                        {/*return (<li style={item.done ? done : normal} key={key} onClick={this.handleDone.bind(this, key)} >{item.name}</li>)*/}
                    {/*})}*/}

                {this.props.items.map((item,key)=>{
                    return (<MuiThemeProvider key={key}>
                        <AppBar
                            style={item.done ? done : undone}
                            title={<span>{item.name}</span>}
                            iconElementLeft={<IconButton><NavigationClose onClick={this.handleDrop.bind(this,key)} /></IconButton>}
                            iconElementRight={<FlatButton label={item.done ? 'UNDONE':'done'} onClick={this.handleDone.bind(this, key)} />}
                        />
                    </MuiThemeProvider>)
                })}


            </div>
        )
    }
}