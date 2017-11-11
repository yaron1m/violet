import * as actionTypes from './action-types';
import * as organizationsActionTypes from '../organizations/action-types';
import * as ordersActionTypes from '../orders/action-types';
import * as offeredLecturesActionTypes from '../lists/action-types';
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {getOrders} from "../orders/selectors";
import {getOrganizations} from "../organizations/reducer";

const initialState = Immutable({
    loggedIn: undefined,
    userId: undefined,
    displayName: "",
    photoURL: "",
    fetchingCount: 3,
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.LOGGED_IN:
            return Immutable.merge(state,{
                loggedIn: true,
                userId: action.userId,
                displayName: action.displayName,
                photoURL: action.photoURL,
            });

        case actionTypes.LOGGED_OUT:
            return Immutable.merge(state,{
                loggedIn: false,
                userId: undefined,
                displayName: "",
                photoURL: "",
            });

        case ordersActionTypes.RECEIVE_ORDERS:
        case organizationsActionTypes.RECEIVE_ORGANIZATIONS:
        case offeredLecturesActionTypes.RECEIVE_LISTS:
            return Immutable.merge(state,{
                fetchingCount: state.fetchingCount - 1
            });

        default:
            return state;
    }
}

export function isLoggedIn(state) {
    return state.firebase.loggedIn;
}

export function isFetching(state){
    const fetchedOrders = _.isEmpty(getOrders(state));
    const fetchedOrganizations = _.isEmpty(getOrganizations(state));
    
    return fetchedOrders || fetchedOrganizations;
}