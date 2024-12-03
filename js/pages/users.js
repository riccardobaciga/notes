import createSelect from "../components/select.js";
import userDetail from "./user.js";
import {setUserDetail} from "./user.js";


export default function showInfo (data){
    myApp.users = data.users;
    const elements = data.users.map(person => ({
        value: person.idUser,
        text: person.nome + " " + person.cognome
    }));
    const usersHtml = `
        ${createSelect("usersSelect", elements, "value", "text", "Seleziona l'utente")}
        <hr>
        ${userDetail({})}
    `;
    myApp.myModal.modal(`<i class="bi bi-person-arms-up"></i> ${$_("Utenti")}`, usersHtml);
    const usersSelect = document.getElementById('usersSelect');
    usersSelect.addEventListener("change", changeUser);
}

function changeUser(){
    const selected = $('#usersSelect').val() * 1;
    myApp.users.forEach(element => {
        if (element.idUser === selected){
            setUserDetail(element);
        }
    });
    
}