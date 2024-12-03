import createTextInput from "../components/textInput.js";
import createPasswordInput from "../components/passwordInput.js";
import createButton from "../components/button.js";
import createCheckInput from "../components/checkInput.js";
import getUser from "../functions/user.js";
import removeUserFromSession from "../functions/session.js";

export default function showLogin (){
    // pulisco tutto
    removeUserFromSession();
    hideCanvas('userMenu');
    _('#noteNavBar').hide();
    clearEditor();
    hideEditor();

    const loginForm = /* html */`

      <div class="bg-danger text-white text-left p-2 invisible"  id="pwdError"></div><br>
      ${createTextInput("nomeUtente", "Login", "login", "")}
      ${createPasswordInput("pwd","Password","Password")}
      ${createCheckInput("persinstentLogin", "Ricordami")}
      <hr>
      <div class="row">
            <div class="col-4 text-center"><img src="./server/captcha.php" alt="CAPTCHA Image"></div>
            <div class="col-8">${createTextInput("securityNumber", '<i class="bi bi-key-fill"></i>', "Scrivi il numero di fianco", "")}</div>
      </div>
 
  `;

    myApp.myModal.login("<i class=\"bi bi-door-open-fill\"></i> LOGIN ",loginForm,[createButton("btn-primary", "doLogin", "bi-floppy-fill", "collegati")]);

    _("#cancelLogin").onEventDo("click", cancelLogin);
    _("#doLogin").onEventDo("click", doLogin);
    managePasswordFields();
    _('#closeMsgModal').hide();
    _("#securityNumber").onEventDo("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default action (form submission, etc.)
            doLogin(); // Call the function
        }
    });
}
function cancelLogin(){
    myApp.myModal.hide();
}

function doLogin(){
    myApp.myModal.hide();
    getUser();
}