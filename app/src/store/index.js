import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import appearance from './Appearance/Reducer';
import firebase from './Firebase/Reducer';
import labels from './Labels/Reducer';
import lists from './Lists/Reducer';
import orders from './orders/Reducer';
import organizations from './Organizations/Reducer';
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
