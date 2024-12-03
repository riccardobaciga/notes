import createTextInput from "../components/textInput.js";
import createButton from "../components/button.js";
import userDetail from "./user.js";
import {saveUserDetail} from "../functions/user.js";

export default function showInfo (){
    const infoHtml = `
        ${createTextInput("loginInfo","Login","loginInfo",myApp.user.login,)}
        ${userDetail(myApp.user)}
    `;

    myApp.myModal.modal(`<i class="bi bi-person-vcard"></i> ${$_("Profilo")}`, infoHtml,[createButton("text-bg-success", "saveUserDetail", "bi-floppy-fill", "SALVA")]);

    _("#loginInfo").disabled = true;
}

