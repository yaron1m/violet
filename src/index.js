import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import injectTapEventPlugin from "react-tap-event-plugin";
import registerServiceWorker from './util/registerServiceWorker';

import './index.css';

import allReducers from './reducers';
import Routes from "./routes";
import {fetchInformation} from "./actions/action-database";


injectTapEventPlugin();

const store = createStore(
    allReducers,
    composeWithDevTools( //TODO add dev tools only in development environment
        applyMiddleware(
            thunkMiddleware,
        )
    )
);

store.dispatch(fetchInformation());

ReactDOM.render(
    <Routes store={store} />,
    document.getElementById('root')
);

registerServiceWorker();