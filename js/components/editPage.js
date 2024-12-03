import { getTextId } from "../functions/text.js";

export default function createEditPage() {
    // console.log(myApp);
    let titolo = "";
    let testo = "";
    let idNota = -1;
    let pubblico = "";
    let notesList = [];

    if (myApp.user.testo) {
        titolo = myApp.user.testo.titolo;
        testo = atob(myApp.user.testo.testo);
        idNota = myApp.user.testo.idNota;
        pubblico = myApp.user.testo.pubblico;
        notesList = myApp.user.testo.dateNote;
    }

    if (notesList !== null) {
        myApp.notesList = `<div class="list-group list-group-flush">` +
            notesList.map((item, index) => {
                if (item.idNota !== idNota) {
                    return `<a href="#" data-bs-dismiss="offcanvas" aria-label="Close" class="list-group-item notesItemList notesListItem hint--bottom" aria-help = "Apri nota ${item.titolo}" idTesto = "${item.idNota}" >${item.titolo} </a>`;
                } else {
                    return `<a href="#" data-bs-dismiss="offcanvas" aria-label="Close" class="list-group-item active notesItemList" idTesto = "${item.idNota}" >${item.titolo} </a>`;
                }
            }).join("") + `</div>`;
    }

    myApp.titoloNota = titolo;

    _('#textDiv').innerHTML = testo;
    _(".notesListItem").onEventDo("click", itemClicked);

    if (! $('#textDiv').data('summernote')) {
            $('#textDiv').summernote({
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['fontname']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ],
            height: 500
        });
    }
}


function itemClicked(element) {
    let idTesto = element.target.getAttribute("idTesto");
    if (idTesto < 0) {
        _("#idNota").value = idTesto;
        _("#titoloEdit").value = "";
        $("#textDiv").summernote('code', '');
    } else {
        getTextId(idTesto);
    }
}