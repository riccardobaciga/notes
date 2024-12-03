import createEditPage from "../components/editPage.js";
import createMenuRight from "../components/menuRight.js";
import createMenuCenter from "../components/menuCenter.js";
import createMenuLeft from "../components/menuLeft.js";
import saveNote from '../functions/text.js';
import { deleteText } from '../functions/text.js';
import createButton from './button.js';

export default function showPage() {
    myApp.appMenu = createMenuRight (myApp.user.menu.Utente)
    myApp.mainMenu = createMenuCenter();
    myApp.noteMenu = createMenuLeft(myApp.user.menu.note);
    myApp.listHelp = document.querySelectorAll('[aria-help]');
    _("#help").onEventDo("click", manageHelp);
    _("#creaNota").onEventDo("click", newNote);
    _("#salvaNota").onEventDo("click", saveNote);
    _("#cancellaNota").onEventDo("click", deleteNote);
    _("#condividiLettura").onEventDo("click", shareNote);
    _("#condividiScrittura").onEventDo("click", shareEditNote);

    createEditPage();

}


function newNote() {
    _("#idNota").value = -1;
    _("#titoloEdit").value = "";
    $("#textDiv").summernote('code', '');
    // notesList = _(".notesList")
    let notesItemList = document.querySelectorAll('.notesItemList');
    if (notesItemList !== null) {
        notesItemList.forEach(function(item) {
            item.className = "list-group-item notesList notesListItem";
        });
    }
    _(".notesListItem").onEventDo("click", itemClicked)

}

function deleteNote() {
    const txt = `Sei sicuro di voler cancellare la nota "${_("#titoloEdit").value}"?`
    myApp.myModal.confirm('<i class="bi bi-trash"></i> CANCELLA NOTA', txt, [createButton("text-bg-danger", "deleteText", "bi-trash", "CANCELLA")])
    _("#deleteText").onEventDo("click", function () {
        deleteText(_("#idNota").value)
    })
        ;
}

function shareEditNote() {
    shareNote("true");
}
function shareNote(pubblico = "") {
    const urlShare = getServerUrl() + "share.php?" + btoa(_("#idNota").value + ";" + pubblico);
    const linkUrlShare = `<a href = ${urlShare} target="_blank">${urlShare}</a>`;
    const txt = `Per condividere il testo condividi questo link <br>
    ->${linkUrlShare}<-`
    myApp.myModal.confirm('<i class="bi bi-share"></i> CONDIVIDI DOCUMENTO', txt, [createButton("text-bg-info", "openShared", "bi-box-arrow-up-right", "APRI"), createButton("text-bg-primary", "copySharedLink", "bi-clipboard-plus", "COPIA")])
    _("#openShared").onEventDo("click", function () {
        window.open(urlShare, "_blank");
    });
    _("#copySharedLink").onEventDo("click", function () {
        const text = urlShare;

        navigator.clipboard.writeText(text)
            .then(() => {
                _('#msgTxt').innerHTML += `<br><div class="alert alert-primary" role="alert">${$_("TESTO COPIATO!!")}</div>`;
            })
            .catch(err => {
                _('#msgTxt').innerHTML += `<br><div class="alert alert-danger" role="alert">${$_("Errore, immpossibile copiare per:") + err}</div>`;
            });
    });
}

function manageHelp() {

    myApp.aiutoBool = !myApp.aiutoBool;
    // console.log(list);
    if (myApp.aiutoBool) {
        myApp.help = "list-group-item active";
        myApp.listHelp.forEach(function (item) {
            const oldClass = item.className;
            const newClass = oldClass.replace('hint--', '%%--');
            item.className = newClass;
            console.log(oldClass + "--" + newClass);
        });
    } else {
        myApp.help = "list-group-item";
        myApp.listHelp.forEach(function (item) {
            const oldClass = item.className;
            const newClass = oldClass.replace('%%--', 'hint--');
            item.className = newClass;
            console.log(oldClass + "--" + newClass);
        });
    }
}

