import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./RoutesContainer";
import Store from './Store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={Store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);