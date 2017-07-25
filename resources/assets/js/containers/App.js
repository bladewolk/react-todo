import React, {Component} from 'react'
import Header from '../components/Header/index'
import Footer from '../components/Footer'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'

import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component{
    componentDidMount(){
        const {load, toggleFetched} = this.props.actions
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
    //input change
    handleChange(event, value) {
        this.props.actions.setTextFieldValue(value)
    }
    handleEnter(event){
        if (event.which == 13)
            this.handleClick()
    }
    //Dispatch button click
    handleClick(){
        if (this.props.textValue.length > 0){
            let {add, reset, toggleFetched} = this.props.actions;
            toggleFetched()
            fetch("/api/todo", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text: this.props.textValue})
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
                            reset()
                            toggleFetched()
                        });
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    }
    toggleDone(id){
        let {toggleFetched, done} = this.props.actions
        toggleFetched()
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
                        done(id)
                        toggleFetched()
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    handleDrop(id){
        let {toggleFetched, del} = this.props.actions
        toggleFetched()
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
                        del(id)
                        toggleFetched()
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    handleFilter(){
        let {toggleFilter, toggleFetched, load} = this.props.actions
        toggleFilter()
        toggleFetched()
        fetch("/api/todo?filter="+!this.props.filter)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        load(data)
                        toggleFetched()
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    render(){
        let change = this.handleChange.bind(this)
        let enter = this.handleEnter.bind(this)
        let click = this.handleClick.bind(this)
        let textValue = this.props.textValue
        let done = this.toggleDone.bind(this)
        let handleDrop = this.handleDrop.bind(this)
        let handleFilter = this.handleFilter.bind(this)

        const CircularProgressExampleSimple = () => (
            <div className="spinner">
                <MuiThemeProvider>
                    <CircularProgress color="#E91E63" size={100} thickness={4} />
                </MuiThemeProvider>
            </div>
        );
        return (
            <div>
                {this.props.fetched ? '' : <CircularProgressExampleSimple/>}
                <Header change={change} click={click} textFieldValue={textValue} filter={this.props.filter}
                        handleFilter={handleFilter} fetched={this.props.fetched} inputEnter={enter}/>
                <Footer items={this.props.items} done={done} drop={handleDrop} />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        items: state.items,
        filter: state.filter,
        fetched: state.fetched,
        textValue: state.textValue
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)