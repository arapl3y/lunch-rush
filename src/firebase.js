import firebase from "firebase";

var config = {
  apiKey: "AIzaSyB9RZk0nqCHGD25mM0lE_fV6Ob5vziAVzw",
  authDomain: "lunch-rush-bf865.firebaseapp.com",
  databaseURL: "https://lunch-rush-bf865.firebaseio.com",
  projectId: "lunch-rush-bf865",
  storageBucket: "lunch-rush-bf865.appspot.com",
  messagingSenderId: "997571665882"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
