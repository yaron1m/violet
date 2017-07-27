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
                dispatch({type: actionTypes.LOGGED_OUT});
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
                dispatch({type: actionTypes.LOGGED_OUT})
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

export function afterSignedIn(user) {
    return function afterSignedIn(dispatch) {
        dispatch({
            type: actionTypes.LOGGED_IN,
            userId: user.uid,
        });

        fetchData('orders', receiveOrders, dispatch);
        fetchData('organizations', receiveOrganizations, dispatch);
        fetchData('offered-lectures', receiveOfferedLectures, dispatch);
    }
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
            //TODO failed sending
        }
        else{
            // TODO success
        }
    });
}
