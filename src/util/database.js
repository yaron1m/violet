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

export function fetchData(name, actionCallback, dispatch) {
    firebase.database().ref(name).on('value', snapshot => {
            dispatch(actionCallback(snapshot.val()));
        },
        error => {
            console.log("The request for " + name + " failed: " + error.code);
        });
}