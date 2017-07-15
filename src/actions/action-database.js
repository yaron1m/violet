import {fetchData, sendData} from '../util/database';
import {receiveOrganizations} from './action-organizations'
import {receiveOrders} from './action-orders'

export function fetchInformation() {
    return function (dispatch) {
        dispatch(requestData(3));
        fetchData('orders', receiveOrders, dispatch);
        fetchData('organizations', receiveOrganizations, dispatch);
        fetchData('offered-lectures', receiveOfferedLectures, dispatch);

    }
}

export function sendInformationToDatabase(collectionName, value) {
    return function (dispatch) {
        dispatch(isSendingToDatabase());
        return sendData(collectionName, value);
        //TODO dispatch sent

    }
}

export const REQUEST_DATA = "REQUEST_DATA";
function requestData(numberOfRequests) {
    return {
        type: REQUEST_DATA,
        payload: numberOfRequests,
    };
}

export const RECEIVE_OFFERED_LECTURES = "RECEIVE_OFFERED_LECTURES";
function receiveOfferedLectures(offeredLectures) {
    return {
        type: RECEIVE_OFFERED_LECTURES,
        payload: offeredLectures,
    };
}


export const IS_SENDING_TO_DATABASE = "IS_SENDING_TO_DATABASE";
export function isSendingToDatabase() {
    return {
        type: IS_SENDING_TO_DATABASE,
    };
}

export const SENT_TO_DATABASE = "SENT_TO_DATABASE";
export function sentToDatabase(successfully) {
    return {
        type: SENT_TO_DATABASE,
        payload: successfully,
    };
}