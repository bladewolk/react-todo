import React from 'react'
import Header from '../components/Header/index'
import Footer from '../components/Footer'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const LoadSpinner = () => (
    <div className="spinner">
        <MuiThemeProvider>
            <CircularProgress color="#E91E63" size={100} thickness={4} />
        </MuiThemeProvider>
    </div>
);

const App = props => {
    if (!props.dataLoaded){
        props.actions.dataloader()
        props.actions.fetchGetTodos(props.filter)
    }

    const inputChange = (event, value) => {
        props.actions.setTextFieldValue(value)
    }
    const inputEnter = event =>{
        if (event.which == 13)
            buttonClick()
    }
    const buttonClick = () => {
        if (props.textValue.length > 0){
            props.actions.toggleFetched()
            props.actions.fetchAddTodo(props.textValue)
        }
    }
    const changeFilter = () => {
        props.actions.toggleFetched()
        props.actions.fetchGetTodos(props.filter)
    }
    const handleDrop = id => {
        props.actions.toggleFetched()
        props.actions.fetchDeleteTodo(id)
    }
    const toggleDone = id => {
        props.actions.toggleFetched()
        props.actions.fetchUpdateTodo(id)
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