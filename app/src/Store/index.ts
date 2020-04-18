import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import appearance from "./Appearance/Reducer";
import firebase from "./Firebase/Reducer";
import lists from "./Lists/Reducer";
import orders from "./Orders/Reducer";
import organizations from "./Organizations/Reducer";
import publicCourses from "./PublicCourses/Reducer";
import selectedOrder from "./SelectedOrder/Reducer";
import selectedOrganization from "./SelectedOrganization/Reducer";
import selectedPublicCourse from "./SelectedPublicCourse/Reducer";
import {initFirebase} from "./Firebase/Actions";

const combinedReducers = combineReducers({
    appearance,
    firebase,
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

// @ts-ignore
store.dispatch(initFirebase());

export default store;
