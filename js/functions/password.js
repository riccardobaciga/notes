export default async function validateNewPassword() {
    _("#pwdError").innerHTML = "";
    _("#pwdError").hide()
    const oldPassword = _("#passwordpwdOld").value;
    const new1Password = _("#passwordpwdNew1").value;
    const new2Password = _("#passwordpwdNew2").value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    var ok = true;
    if (oldPassword.length < 1) {
        _("#pwdError").innerHTML = $_("INSERIRE LA PASSWORD ORIGINALE <br>");
        ok = false;
    }
    if (!passwordRegex.test(new1Password)) {
        _("#pwdError").innerHTML += `
            ${$_("La password deve avere:")}:
            <ul>
              <li>${$_("lunghezza minima 8")}</li>
              <li>${$_("una maiuscola")}</li>
              <li>${$_("una minuscola")}</li>
              <li>${$_("un numero")}</li>
              <li>${$_("un carateere speciale")} #, @, .. </li>
              </ul>`;
        ok = false;
    }
    if (new1Password !== new2Password) {
        _("#pwdError").innerHTML += $_("Le nuove password non corrispondono");
        ok = false;
    }
    if (ok) {
        await callServer({
            object: "user",
            action: "changePassword",
            param: {
                "idUser": myApp.user.idUser,
                "login": myApp.user.login,
                "oldPassword": oldPassword,
                "newPassword": new1Password
            },
        }).then((data) => {
            // setSession("user", myApp.user, myApp.currentUser.sessionStorage);
            console.log(data);
        });
    } else {
        _("#pwdError").show();
    }
}