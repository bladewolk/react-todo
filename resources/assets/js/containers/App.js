import React, {Component} from 'react'
import Header from '../components/header'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'

class App extends Component{
    componentDidMount(){
        let {load} = this.props.actions
        // fetch('/api/test')
        //     .then(
        //         function(response) {
        //             if (response.status !== 200) {
        //                 console.log('Looks like there was a problem. Status Code: ' +
        //                     response.status);
        //                 return;
        //             }
        //
        //             // Examine the text in the response
        //             response.json().then(function(data) {
        //                 load(data);
        //             });
        //         }
        //     )
        //     .catch(function(err) {
        //         console.log('Fetch Error :-S', err);
        //     });
    }
    render(){
        let {items} = this.props
        return (
            <Header items={items} actions={this.props.actions} />
        )
    }
}

function mapStateToProps (state) {
    return {
        items: state.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)