import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
let store = createStore(rootReducer)


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default;
        ReactDOM.render(
            <NextApp/>,
            document.getElementById('root')
        );
    });
}