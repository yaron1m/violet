import {fetchData, sendData} from '../util/firebase-handler';
import {receiveOrganizations} from '../store/organizations/actions'
import {receiveOrders} from '../store/orders/actions'
import {receiveOfferedLectures} from "../store/offered-lectures/actions";


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