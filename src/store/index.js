import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import {combineReducers} from 'redux';
import appearance from './Appearance/Reducer';
import firebase from './Firebase/Reducer';
import labels from './Labels/Reducer';
import lists from './lists/reducer';
import orders from './orders/reducer';
import organizations from './organizations/reducer';
import publicCourses from './PublicCourses/reducer';
import selectedOrder from './SelectedOrder/Reducer';
import selectedOrganization from './SelectedOrganization/Reducer';
import selectedPublicCourse from './SelectedPublicCourse/Reducer';
import {initFirebase} from "./Firebase/Actions";

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
