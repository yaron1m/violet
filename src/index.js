import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import allReducers from './reducers';
import injectTapEventPlugin from "react-tap-event-plugin";
import thunkMiddleware from 'redux-thunk';
import {fetchOrganizations} from "./actions/action-organizations";


injectTapEventPlugin();

const store = createStore(
    allReducers,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
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