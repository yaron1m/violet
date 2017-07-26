import * as actionTypes from './action-types';
import {receiveOrganizations} from '../organizations/actions'
import {receiveOrders} from '../orders/actions'
import {receiveOfferedLectures} from "../offered-lectures/actions";
import * as firebase from 'firebase';
import * as reducer from './reducer';

const firebaseConfig = {
    apiKey: "AIzaSyBYLZaVfwMoWhCBzvhO8qJjC-CzqRceR0c",
    authDomain: "violet-36bed.firebaseapp.com",
    databaseURL: "https://violet-36bed.firebaseio.com",
    projectId: "violet-36bed",
    storageBucket: "violet-36bed.appspot.com",
    messagingSenderId: "259015014878"
};

export function initFirebase() {
    return async function signInRequest(dispatch, getState) {

        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                dispatch(afterSignedIn(user));
            } else {
                dispatch({type: actionTypes.SIGNED_OUT});
            }
        });
    }
}


export function signInRequest(email, password) {
    return async function signInRequest(dispatch, getState) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                dispatch(afterSignedIn(user));
            })
            .catch(function (error) {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(error.message);
                }
                console.error(error);
            });
    }
}

export function signOutRequest() {
    return async function signInRequest(dispatch, getState) {
        if (!reducer.isLoggedIn(getState()))
            return;

        firebase.auth().signOut()
            .then(() => {
                dispatch({
                    type: actionTypes.SIGNED_OUT,
                })
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

export function afterSignedIn(user){
    return function afterSignedIn(dispatch){
        dispatch({
            type: actionTypes.SIGNED_IN,
            userId: user
        });

    }
}


export function changeLoginStatus(userId) {
    return {
        type: actionTypes.CHANGE_LOGIN_STATUS,
        payload: userId,
    }
}


export function fetchDataFromDatabase() {

}


export function fetchData(collectionName, actionCallback, dispatch, errorCallback) {
    firebase.database().ref(collectionName).on('value', snapshot => {
            dispatch(actionCallback(snapshot.val()));
        },
        error => {
            if (errorCallback)
                errorCallback(collectionName, error.code);
            else
                console.Error("The request for " + collectionName + " failed: " + error.code);
        });
}

export function sendData(collectionName, value, dispatch) {
    return firebase.database().ref(collectionName).set(value, error => {
        if (error) {
            console.error("The data send request for " + collectionName + " failed: " + error.code);
            dispatch(sentToDatabase(false));
        }
        else
            dispatch(sentToDatabase(true));
    });
}


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