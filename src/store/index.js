import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import {combineReducers} from 'redux';
import appearance from './appearance/reducer';
import firebase from './firebase/reducer';
import labels from './labels/reducer';
import offeredLectures from './offered-lectures/reducer';
import orders from './orders/reducer'
import organizations from './organizations/reducer'
import selected from './selected/reducer'
import requiredFields from './required-fields/reducer'
import {initFirebase} from "./firebase/actions";

const combinedReducers = combineReducers({
    appearance,
    firebase,
    labels,
    offeredLectures,
    orders,
    organizations,
    selected,
    requiredFields,
});

const store = createStore(
    combinedReducers,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
        )
    )
);

store.dispatch(initFirebase());

export default store;
