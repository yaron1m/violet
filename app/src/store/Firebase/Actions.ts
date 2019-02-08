/*eslint no-console: ["error", { allow: ["error"] }] */

import * as actionTypes from './ActionTypes';
import {receiveOrganizations} from '../Organizations/Actions';
import {receiveOrders} from '../orders/actions';
import {receiveLists} from "../Lists/Actions";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import {getLabels} from "../Labels/Selectors";
import {receivePublicCourses} from "../PublicCourses/actions";
import {isLoggedIn} from "./Selectors";
import {IDispatch, IGetState} from '../../Interfaces/ReduxInterfaces';

const firebaseProductionConfig = {
    apiKey: "AIzaSyBYLZaVfwMoWhCBzvhO8qJjC-CzqRceR0c",
    authDomain: "violet-36bed.firebaseapp.com",
    databaseURL: "https://violet-36bed.firebaseio.com",
    projectId: "violet-36bed",
    storageBucket: "violet-36bed.appspot.com",
    messagingSenderId: "259015014878"
};

const firebaseDevelopmentConfig = {
    apiKey: "AIzaSyB0hDCH-PoE-nAXVoP4Ba6gNYAfMDufajE",
    authDomain: "violet-dev.firebaseapp.com",
    databaseURL: "https://violet-dev.firebaseio.com",
    projectId: "violet-dev",
    storageBucket: "violet-dev.appspot.com",
    messagingSenderId: "97871190058"
};

// const firebaseDemoConfig = {
//     apiKey: "AIzaSyAAHuLkm30DwFxBiFEvfO0ejiBEFAvfhTQ",
//     authDomain: "violet-demo.firebaseapp.com",
//     databaseURL: "https://violet-demo.firebaseio.com",
//     projectId: "violet-demo",
//     storageBucket: "violet-demo.appspot.com",
//     messagingSenderId: "425792520023"
// };

const firebaseConfig = process.env.NODE_ENV === "production" ? firebaseProductionConfig : firebaseDevelopmentConfig;

export function initFirebase() {
    return async function signInRequest(dispatch: IDispatch) {

        const promise = firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged((user) => {
            if (user === null) {
                dispatch({type: actionTypes.LOGGED_OUT});
            } else {
                dispatch(afterSignedIn(user));
            }
        });

        return promise;
    };
}

export function signInWithGoogle(errorCallback: (message: string) => void) { //TODO this should not be an action
    return function signInRequest() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
            .catch(function (error) {
                errorCallback(error.message);
                console.error(error);
            });
    };
}

export function signInRequest(email: string, password: string, errorCallback: (message: string) => void) {
    return function signInRequest(dispatch: IDispatch, getState: IGetState) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(null, signInFailure);

        function signInFailure(error: firebase.auth.Error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    errorCallback(getLabels(getState()).pages.loginPage.errors.invalidEmail);
                    return;

                case 'auth/wrong-password':
                    errorCallback(getLabels(getState()).pages.loginPage.errors.wrongPassword);
                    return;

                case 'auth/user-disabled':
                    errorCallback(getLabels(getState()).pages.loginPage.errors.userDisabled);
                    return;

                case 'auth/user-not-found':
                    errorCallback(getLabels(getState()).pages.loginPage.errors.userNotFound);
                    return;

                default:
                    errorCallback(error.message);
                    return;
            }
        }
    };
}

export function afterSignedIn(user: firebase.User) {
    return function afterSignedIn(dispatch: IDispatch) {
        dispatch({
            type: actionTypes.LOGGED_IN,
            userId: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isSuperUser: user.email ? !user.email.toLowerCase().includes("asaf") : false,
        });
        dispatch(fetchData('organizations', receiveOrganizations));
        dispatch(fetchData('orders', receiveOrders));
        dispatch(fetchData('publicCourses', receivePublicCourses));
        dispatch(fetchData('lists', receiveLists));
    };
}

export function signOutRequest() {
    return async function signInRequest(dispatch: IDispatch, getState: IGetState) {
        if (!isLoggedIn(getState()))
            return;

        firebase.auth().signOut()
            .then(() => {
                dispatch({type: actionTypes.LOGGED_OUT});
            })
            .catch(function (error) {
                console.error(error);
            });
    };
}

export function fetchData(collectionName: string, actionCallback: (val: any) => object) {
    return function afterSignedIn(dispatch: IDispatch) {
        firebase.database().ref(collectionName).on('value', snapshot => {
                if (snapshot !== null)
                    dispatch(actionCallback(snapshot.val()));
            },
            (error: firebase.FirebaseError) => {
                console.error("The request for " + collectionName + " failed: " + error.code);
            });
    };
}

export function sendDataToDatabase(collectionPath: string, value: object) {
    return firebase.database().ref(collectionPath).set(value)
        .catch((e) => console.error(`error saving ${collectionPath} - ` + e));
}
