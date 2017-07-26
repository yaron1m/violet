import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {combineReducers} from 'redux';
import drawer from './drawer/reducer';
import firebase from './firebase/reducer';
import labels from './labels/reducer';
import offeredLectures from './offered-lectures/reducer';
import orders from './orders/reducer'
import organizations from './organizations/reducer'
import selected from './selected/reducer'
import {initFirebase} from "./firebase/actions";

const combinedReducers = combineReducers({
    drawer,
    firebase,
    labels,
    offeredLectures,
    orders,
    organizations,
    selected,
});

const store = createStore(
    combinedReducers,
    composeWithDevTools( //TODO add dev tools only in development environment
        applyMiddleware(
            thunkMiddleware,
        )
    )
);

store.dispatch(initFirebase());

export default store;
