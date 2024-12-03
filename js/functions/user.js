import showLogin from "../pages/login.js";
import showPage from '../pages/page.js';


export default async function getUser() {

    let login = _("#nomeUtente").value;
    let password = _("#passwordpwd").value;
    let securityNumber = _("#securityNumber").value;
    let persinstentLogin = _("#persinstentLogin").checked;
    await callServer({
        object: "user",
        action: "checkUser",
        param: { "login": login, "password": password, "securityNumber": securityNumber }
    }).then((user) => {
        if (user.error) {
            console.log(user);
            showLogin();
            _("#pwdError").innerHTML = user.error;
            _("#securityNumber").value = securityNumber;
            _("#nomeUtente").value = login;
            _("#passwordpwd").value = password;
            _("#pwdError").show();
        } else {
            if (persinstentLogin) {
                putUserToLocalStorage(user);
            }
            console.log(user);
            _('#closeMsgModal').show();
            _('#noteNavBar').show();
            myApp.user = user;
            showPage();
        }
    });

    function putUserToLocalStorage(user) {
        const userJson = JSON.stringify(user);
        const encodedUser = btoa(userJson);
        localStorage.setItem('userNotesRecord', encodedUser);
    }
}
export async function setUserProfile(user) {
    _("#userMenuLabel").innerHTML = user.cognome + " " + user.nome;
    await callServer({
        object: "user",
        action: "getUserEnviroment",
        param: { "idUser": user.idUser }
    }).then((data) => {
        myApp.user = data;
        showPage();
    });
}

export function saveUserDetail(user){

}

export function getUserFromLocalStorage() {
    const encodedUser = localStorage.getItem('userNotesRecord');

    if (encodedUser) {
        const decodedUserJson = atob(encodedUser);
        const user = JSON.parse(decodedUserJson);
        return user;
    }

    return null;
}