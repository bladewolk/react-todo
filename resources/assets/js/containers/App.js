import React from 'react'
import Header from '../components/Header/index'
import Footer from '../components/Footer'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const componentMount = ({ load, toggleFetched, dataloader }) => {
    dataloader()
    fetch('/api/todo')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function(data) {
                    load(data);
                    toggleFetched()
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

const LoadSpinner = () => (
    <div className="spinner">
        <MuiThemeProvider>
            <CircularProgress color="#E91E63" size={100} thickness={4} />
        </MuiThemeProvider>
    </div>
);

const App = props => {
    if (!props.dataLoaded)
        componentMount(props.actions)

    const inputChange = (event, value) => {
        props.actions.setTextFieldValue(value)
    }
    const inputEnter = event =>{
        if (event.which == 13)
            buttonClick()
    }
    const buttonClick = () => {
        if (props.textValue.length > 0) {
            props.actions.toggleFetched()
            fetch("/api/todo", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text: props.textValue})
            })
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        response.json().then(function (data) {
                            props.actions.add(data);
                            props.actions.reset()
                            props.actions.toggleFetched()
                        });
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    }
    const changeFilter = () => {
        props.actions.toggleFilter()
        props.actions.toggleFetched()
        fetch("/api/todo?filter="+!props.filter)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        props.actions.load(data)
                        props.actions.toggleFetched()
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    const handleDrop = id => {
        props.actions.toggleFetched()
        fetch("/api/todo/"+id, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_method: 'DELETE'})
        })
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        props.actions.del(id)
                        props.actions.toggleFetched()
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    const toggleDone = id => {
        props.actions.toggleFetched()
        fetch("/api/todo/"+id, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, _method: 'PATCH'})
        })
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        props.actions.done(id)
                        props.actions.toggleFetched()
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    return (
        <div>
            {props.fetched ? '' : <LoadSpinner/>}
            <Header change={inputChange} fetched={props.fetched} click={buttonClick} value={props.textValue}
                    inputEnter={inputEnter} filter={props.filter} handleFilter={changeFilter} />
            <Footer items={props.items} done={toggleDone} drop={handleDrop} />
        </div>
    )
}

function mapStateToProps (state) {
    return {
        items: state.items,
        filter: state.filter,
        fetched: state.fetched,
        textValue: state.textValue,
        dataLoaded: state.dataLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)