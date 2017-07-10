import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import injectTapEventPlugin from "react-tap-event-plugin";
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import allReducers from './reducers';
import {fetchOrganizations} from "./actions/action-organizations";
import Routes from "./routes";


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
    <Routes store={store} />,
    document.getElementById('root')
);

registerServiceWorker();