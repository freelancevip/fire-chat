import {default as firebase, initializeApp} from 'firebase'

let config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

const app = initializeApp(config);

export const db = app.database();
export const auth = firebase.auth();