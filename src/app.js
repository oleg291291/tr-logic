import './styles/normalize.sass';
import './styles/theme.sass';


import './firebase/firebase';
import { firebaseSignIn, firebaseSignUp } from './firebase/firebase'

import {barbaTransition} from './pjax/barba';




document.addEventListener("DOMContentLoaded", () => {

    const formTabs = document.querySelector(".form__tabs");
    formTabs.addEventListener("click", formTabsClickHandler);
    function formTabsClickHandler(event) {

        event.preventDefault();
        if (event.target.tagName != 'A') {
            return
        }
        const targetHref = event.target.getAttribute("href");

        if (!event.target.classList.contains('form__tab__active')) {
            document.querySelector('.form__tab__active').classList.remove('form__tab__active');
            event.target.classList.add('form__tab__active');

            document.querySelector('.form__panel__show').classList.add('form__panel__hide');
            document.querySelector('.form__panel__show').classList.remove('form__panel__show');

            document.querySelector(targetHref).classList.add('form__panel__show');
            document.querySelector(targetHref).classList.remove('form__panel__hide');


        }

    }
    ////

    const formSignIn = document.querySelector(".form-login");
    formSignIn.addEventListener('submit', formSignInHandler);

    function formSignInHandler(event) {
        event.preventDefault();
        firebaseSignIn();
    }


    const formSignUp = document.querySelector(".form-registration");
    formSignUp.addEventListener('submit', formSignUpHandler);

    function formSignUpHandler(event) {
        event.preventDefault();
        firebaseSignUp();
    }

    barbaTransition();

})
