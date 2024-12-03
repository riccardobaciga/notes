
import dispatch from "./js/utils/dispatch.js";
import { getUserFromLocalStorage } from "./js/functions/user.js";
import showLogin from "./js/pages/login.js";
import { setUserProfile } from "./js/functions/user.js";
import saveText from "./js/functions/text.js";

export default function init() {

    initDates();
    initModal();
    initEvents();
    
    myApp.user = getUserFromLocalStorage();
    if (myApp.user === null) {
        showLogin();
    } else {
        setUserProfile(myApp.user)
    }

}

function initDates() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); // Day
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (0-indexed)
    const yyyy = today.getFullYear(); // Year

    // Format the date as yyyy-mm-dd
    myApp.todayFormatted = `${yyyy}${mm}${dd}`;
    myApp.today = `${yyyy}-${mm}-${dd}`;
}

function initModal() {
    myApp.myModal = msgModal("msgModal");
    myApp.fullscreenModal = new bootstrap.Modal('#fullscreenModal');

}


function initEvents() {
    // myApp.fullscreenModal = msgModal("fullscreenModal");
    window.addEventListener('hashchange', dispatch);

    document.addEventListener('keydown', function (event) {
        // Check if the Ctrl (or Cmd) key is pressed along with the S key
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault(); // Prevent the default save action
            saveText();
        }
    });
}