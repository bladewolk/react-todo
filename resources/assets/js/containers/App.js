import React, {Component} from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
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
        let {items, filter} = this.props
        let filterApply = (items, filter) => {
            switch (filter) {
                case 'FILTER_ALL':
                    return items
                case 'FILTER_ACTIVE':
                    return items.filter(t => !t.done)
                case 'FILTER_DONE':
                    return items.filter(t => t.done)
            }
        }
        return (
            <div>
                <Header items={filterApply(items, filter)} actions={this.props.actions} />
                <Footer actions={this.props.actions} />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        items: state.items,
        filter: state.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)