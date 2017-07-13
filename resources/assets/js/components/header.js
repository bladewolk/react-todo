import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Header extends Component{
    handleChange(event) {
        if (event.keyCode == 13)
            this.handleClick()
    }

    handleClick(){
        if (this.text.input.value != ''){
            let {add, toggleFetched} = this.props.actions;
            toggleFetched();
            fetch("/api/todo", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: this.text.input.value
                })
            })
                .then(
                    function(response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        response.json().then(function(data) {
                            add(data);
                            toggleFetched();
                        });
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
            this.text.input.value = ''
        }
    }
    handleDone(key){
        let {done} = this.props.actions;
        fetch("/api/todo/"+key, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(id) {
                       done(id)
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    handleDrop(key){
        let {del} = this.props.actions
        fetch("/api/todo/"+key, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(id) {
                        del(id)
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
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
                        onKeyUp={this.handleChange.bind(this)}
                        ref={input => this.text = input}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <FlatButton label="DISPATCH" primary={true} onClick={this.handleClick.bind(this)}/>
                </MuiThemeProvider>

                {this.props.items.map((item,key)=>{
                    return (<MuiThemeProvider key={key}>
                        <AppBar
                            style={item.done ? done : undone}
                            title={<span>{item.text}</span>}
                            iconElementLeft={<IconButton><NavigationClose onClick={this.handleDrop.bind(this,item.id)} /></IconButton>}
                            iconElementRight={<FlatButton label={item.done ? 'UNDONE':'done'} onClick={this.handleDone.bind(this, item.id)} />}
                        />
                    </MuiThemeProvider>)
                })}
            </div>
        )
    }
}