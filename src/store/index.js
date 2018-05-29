import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import {combineReducers} from 'redux';
import appearance from './appearance/reducer';
import firebase from './firebase/reducer';
import labels from './labels/reducer';
import lists from './lists/reducer';
import orders from './orders/reducer';
import organizations from './organizations/reducer';
import publicCourses from './PublicCourses/reducer';
import selectedOrder from './SelectedOrder/Reducer';
import selectedOrganization from './SelectedOrganization/Reducer';
import selectedPublicCourse from './SelectedPublicCourse/Reducer';
import {initFirebase} from "./firebase/actions";

const combinedReducers = combineReducers({
    appearance,
    firebase,
    labels,
    lists,
    orders,
    organizations,
    publicCourses,
    selectedOrder,
    selectedOrganization,
    selectedPublicCourse,
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
