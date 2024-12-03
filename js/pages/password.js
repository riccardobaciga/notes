import createPasswordInput from "../components/passwordInput.js";
import createButton from '../components/button.js';
import validateNewPassword from "../functions/password.js";

export default function showPassword (){
    const passwordHtml = `
      ${createPasswordInput("pwdOld","Password Attuale","Password Attuale")}
      <hr>
      ${createPasswordInput("pwdNew1","Password Nuova","Password Nuova")}
      ${createPasswordInput("pwdNew2","Password Nuova Ripeti","Password Nuova")}
      <div class="alert alert-danger" role="alert" id="pwdError"></div>
    `;

    myApp.myModal.modal(`<i class="bi bi-fingerprint"></i> ${$_("Cambia password")}`, passwordHtml,[createButton("text-bg-danger", "changePasswor", "bi-pencil-square", "CAMBIA")]);
    _("#pwdError").hide()
    managePasswordFields();
    _("#changePasswor").onEventDo("click", validateNewPassword);

}