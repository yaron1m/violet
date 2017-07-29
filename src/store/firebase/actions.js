import * as actionTypes from './action-types';
import {receiveOrganizations} from '../organizations/actions'
import {receiveOrders} from '../orders/actions'
import {receiveOfferedLectures} from "../offered-lectures/actions";
import * as firebase from 'firebase';
import * as reducer from './reducer';
import {getLabels} from "../labels/reducer";

const firebaseConfig = {
    apiKey: "AIzaSyBYLZaVfwMoWhCBzvhO8qJjC-CzqRceR0c",
    authDomain: "violet-36bed.firebaseapp.com",
    databaseURL: "https://violet-36bed.firebaseio.com",
    projectId: "violet-36bed",
    storageBucket: "violet-36bed.appspot.com",
    messagingSenderId: "259015014878"
};

export function initFirebase() {
    return async function signInRequest(dispatch) {

        const promise = firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Login status - " + user.uid);
                dispatch(afterSignedIn(user));
            } else {
                console.log("Logged out");
                dispatch({type: actionTypes.LOGGED_OUT});
            }
        });

        return promise;
    }
}

export function signInRequest(email, password, errorCallback) {
    return async function signInRequest(dispatch, getState) {
        function signInSuccess(user) {
            dispatch(afterSignedIn(user));
        }

        function signInFailure(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    errorCallback(getLabels(getState()).loginPage.errors.invalidEmail);
                    return;

                case 'auth/wrong-password':
                    errorCallback(getLabels(getState()).loginPage.errors.wrongPassword);
                    return;

                case 'auth/user-disabled':
                    errorCallback(getLabels(getState()).loginPage.errors.userDisabled);
                    return;

                case 'auth/user-not-found':
                    errorCallback(getLabels(getState()).loginPage.errors.userNotFound);
                    return;

                default:
                    errorCallback(error.message);
                    return;
            }
        }

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(signInSuccess, signInFailure);
    }
}

export function afterSignedIn(user) {
    return function afterSignedIn(dispatch) {
        dispatch({
            type: actionTypes.LOGGED_IN,
            userId: user.uid,
        });

        dispatch(fetchData('orders', receiveOrders));
        dispatch(fetchData('organizations', receiveOrganizations));
        dispatch(fetchData('offered-lectures', receiveOfferedLectures));
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

export function fetchData(collectionName, actionCallback) {
    return function afterSignedIn(dispatch) {
        firebase.database().ref(collectionName).on('value', snapshot => {
                dispatch(actionCallback(snapshot.val()));
            },
            error => {
                console.error("The request for " + collectionName + " failed: " + error.code);
            });
    }
}

export function sendDataToDatabase(collectionPath, value) {
    return firebase.database().ref(collectionPath).set(value);
}
