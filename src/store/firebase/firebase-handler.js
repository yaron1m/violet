import * as firebase from 'firebase';
import {sentToDatabase} from './actions'

const firebaseConfig = {
    apiKey: "AIzaSyBYLZaVfwMoWhCBzvhO8qJjC-CzqRceR0c",
    authDomain: "violet-36bed.firebaseapp.com",
    databaseURL: "https://violet-36bed.firebaseio.com",
    projectId: "violet-36bed",
    storageBucket: "violet-36bed.appspot.com",
    messagingSenderId: "259015014878"
};

firebase.initializeApp(firebaseConfig);

firebase.database();

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
