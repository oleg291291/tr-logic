////Barba.js for smooth pages transition with Push State AJAX
import Barba from 'barba';
var validator = require('validator');

import { profileData, firebaseLogOut } from '../firebase/firebase'

function barbaTransition(){

    Barba.Pjax.start();
    Barba.Pjax.init();
    Barba.Prefetch.init();

    var HideShowTransition = Barba.BaseTransition.extend({
        start: function () {
            this.newContainerLoading.then(this.finish.bind(this));

        },

        finish: function () {
            document.body.scrollTop = 0;
            document.querySelector('.profile__user-name').textContent = "Name: " + validator.escape(profileData.userName);
            document.querySelector('.profile__user-email').textContent = "Email: " + validator.escape(profileData.userEmail);

            const profileLogOut = document.querySelector(".profile__button-log-out");
            profileLogOut.addEventListener('click', firebaseLogOut);

            this.done();

        }
    });

    Barba.Pjax.getTransition = function () {
        return HideShowTransition;
    };
}

function redirectToProfile() {
    const currentPathName = window.location.pathname;
    Barba.Pjax.goTo("profile.html");
    window.history.replaceState('', '', currentPathName);
}

export {barbaTransition, redirectToProfile}
