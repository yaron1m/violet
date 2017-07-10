import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import injectTapEventPlugin from "react-tap-event-plugin";
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';

import allReducers from './reducers';
import {fetchOrganizations} from "./actions/action-organizations";


injectTapEventPlugin();

const store = createStore(
    allReducers,
    composeWithDevTools( //TODO add dev tools only in development environment
        applyMiddleware(
            thunkMiddleware,
        )
    )
);

store.dispatch(fetchOrganizations());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();