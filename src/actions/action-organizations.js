import database from '../database';

export const REQUEST_ORGANIZATIONS = "REQUEST_ORGANIZATIONS";
export function requestOrganizations() {
    return {
        type: REQUEST_ORGANIZATIONS,
    };
}

export const RECEIVE_ORGANIZATIONS = "RECEIVE_ORGANIZATIONS";
export function receiveOrganizations(organizations) {
    return {
        type: RECEIVE_ORGANIZATIONS,
        payload: organizations,
    };
}

export function fetchOrganizations() {
    return function (dispatch) {
        dispatch(requestOrganizations());

        return database.ref('organizations').on('value',snapshot => {
            dispatch(receiveOrganizations(snapshot.val()));
        },
            error => {console.log("The request for organizations failed: " + error.code);
        });
    }
}