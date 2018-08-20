import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Barba from 'barba';

import {redirectToProfile} from '../pjax/barba'

var profileData = {};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCPKzRocgAX6hrS1oMwKV9wrle-0dWUbj0",
    authDomain: "validation-form-database.firebaseapp.com",
    databaseURL: "https://validation-form-database.firebaseio.com",
    projectId: "validation-form-database",
    storageBucket: "validation-form-database.appspot.com",
    messagingSenderId: "970461980640"
};
firebase.initializeApp(config);

var database = firebase.database();

var profileData = {};


function firebaseSignIn() {
    firebase.auth()
        .signInWithEmailAndPassword(document.querySelector('.form-login__input-email').value, document.querySelector('.form-login__input-password').value)
        .then(function (authObj) {

            database.ref('users/' + authObj.user.uid).once('value').then((snapshot) => {
                profileData = snapshot.val();
                redirectToProfile();

            })
        })
        .catch(function (err) {
            console.error(`SIGN IN ERROR - ${err}`);
            document.querySelector(".form__login-tips").textContent = err;

        });
}

function firebaseSignUp() {
    firebase
        .auth()
        .createUserWithEmailAndPassword(document.querySelector('.form-registration__input-email').value, document.querySelector('.form-registration__input-password').value)
        .then(function (authObj) {
            firebase.auth().signInWithEmailAndPassword(document.querySelector('.form-registration__input-email').value, document.querySelector('.form-registration__input-password').value)
            var uid = authObj.user.uid;
            firebase.database().ref('users/' + uid).set({
                userName: document.querySelector('.form-registration__input-name').value,
                userEmail: authObj.user.email
            });
            return authObj
        })
        .catch(function (err) {
            console.error(`REGISTRATION ERROR - ${err}`);
            document.querySelector(".form__sign-up-tips").textContent = err;
        })
        .then(function (authObj) {
            database.ref('users/' + authObj.user.uid).once('value').then((snapshot) => {
                profileData = snapshot.val();
                redirectToProfile();
            })
        })
}

function firebaseLogOut() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            location.reload();
        }).catch(function (error) {
            console.log('LOG OUT ERROR: ' + error);
        });
}

export { profileData, firebaseSignIn, firebaseSignUp, firebaseLogOut }