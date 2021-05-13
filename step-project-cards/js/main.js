import Request from "./1_ajax-requests.js";
import Modal from "./2_modal.js";
import Visit from "./4_visits.js";
import LiveSearch from "./6_live-search.js";

//----------------------------
window.onload = function () {
    let token = sessionStorage.getItem('token');
    LiveSearch.filterHide();

    let signInBtn = document.querySelector('.sign-in-btn');
    signInBtn.addEventListener('click', () => new Modal("login"));

    let createVisitBtn = document.querySelector('.create-visit-btn');
    createVisitBtn.addEventListener('click', () => new Modal("createVisit"));

    if (token) {
        createVisitBtn.style.display = "inline-block";

        new Promise((resolve, reject) => {
            resolve(new Request("getAllVisits"));
        })
            .then((data) => {
                if (data.length !== 0) {
                    Visit.renderAllVisits(data);
                    LiveSearch.filterShow();
                }
            })
            .catch(error => console.error(error));
    } else if (!token) {
        signInBtn.style.display = 'inline-block';
    }
}


// email: dima1@gmail.com
// password: jUk9Kioap{q9
