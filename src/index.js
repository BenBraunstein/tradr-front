import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'

import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers'
import {Provider} from 'react-redux'

// Store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Reducers


// Dispatch


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
