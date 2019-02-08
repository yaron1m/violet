import {getOrders} from "../orders/Selectors";
import {getOrganizations} from "../Organizations/Selectors";
import {IState} from '../../Interfaces/ReduxInterfaces';
import _ from 'lodash';
import {toMutable} from '../../util/ObjectUpdater';

function getFirebase(state: IState){
    return toMutable(state.firebase)
}

export function isLoggedIn(state: IState) {
    return getFirebase(state).loggedIn;
}

export function isFetching(state: IState) {
    const fetchedOrders = _.isEmpty(getOrders(state));
    const fetchedOrganizations = _.isEmpty(getOrganizations(state));

    return fetchedOrders || fetchedOrganizations;
}

export function isSuperUser(state: IState) {
    return getFirebase(state).isSuperUser;
}