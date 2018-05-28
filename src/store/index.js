import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import {combineReducers} from 'redux';
import appearance from './appearance/reducer';
import firebase from './firebase/reducer';
import labels from './labels/reducer';
import lists from './lists/reducer';
import orders from './orders/reducer'
import organizations from './organizations/reducer'
import publicCourses from './PublicCourses/reducer'
import selected from './SelectedPublicCourse/Reducer'
import selectedOrder from './SelectedOrder/Reducer'
import {initFirebase} from "./firebase/actions";

const combinedReducers = combineReducers({
    appearance,
    firebase,
    labels,
    lists,
    orders,
    organizations,
    publicCourses,
    selected,
    selectedOrder
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
