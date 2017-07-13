import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBYLZaVfwMoWhCBzvhO8qJjC-CzqRceR0c",
    authDomain: "violet-36bed.firebaseapp.com",
    databaseURL: "https://violet-36bed.firebaseio.com",
    projectId: "violet-36bed",
    storageBucket: "violet-36bed.appspot.com",
    messagingSenderId: "259015014878"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();

export function fetchData(collectionName, actionCallback, dispatch) {
    firebase.database().ref(collectionName).on('value', snapshot => {
            dispatch(actionCallback(snapshot.val()));
        },
        error => {
            console.log("The request for " + collectionName + " failed: " + error.code);
        });
}
export function sendData(collectionName, value) {
    firebase.database().ref(collectionName).set(value, error => {
            console.log("The data send request for " + collectionName + " failed: " + error.code);
        });
}
