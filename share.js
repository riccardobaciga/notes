
import dispatch from "./js/utils/dispatch.js";
import {saveShare} from "./js/functions/text.js";
import saveText from "./js/functions/text.js";

export default function init(){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); // Day
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (0-indexed)
    const yyyy = today.getFullYear(); // Year

    // Format the date as yyyy-mm-dd
    myApp.todayFormatted = `${yyyy}${mm}${dd}`;
    myApp.today = `${yyyy}-${mm}-${dd}`;
    
    myApp.myModal = msgModal("msgModal");
    // myApp.fullscreenModal = new bootstrap.Modal('#fullscreenModal');
    
    // myApp.fullscreenModal = msgModal("fullscreenModal");
    window.addEventListener('hashchange', dispatch);
    initUser();
    initShare();

    document.addEventListener('keydown', function(event) {
        // Check if the Ctrl (or Cmd) key is pressed along with the S key
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            if (document.querySelector('.note-editor')) {
                saveSharedText();
                event.preventDefault();
            }
        }
    });
}

function saveSharedText(){
    saveText();
}

function initUser(){
    
    myApp.user = {
        idUser  : "0",
        login   : "anonymous"
    };
}
function initShare(){
    document.getElementById('creaPdf').addEventListener('click', function() {
        if ($('#textDiv').data('summernote') !== undefined){
            saveShare();
         }else{
            let pdf = html2pdf();
            const fileName = _("#titoloEdit").value
            const element = document.getElementById('textDiv');
            let nomePdf = fileName.replace(/ /g, "_") + ".pdf";
            pdf.from(element)
              .save(nomePdf);
         }
      });
      
      if(document.getElementById('editNote')){
            document.getElementById('editNote').addEventListener('click', function() {

                if (this.innerHTML === '<i class="bi bi-x-square"></i> Chiudi editor'){
                    this.innerHTML = '<i class="bi bi-pencil me-2"></i>  Modifica';
                    $("#creaPdf").html('<i class="bi bi-file-pdf me-2"></i>  Crea pdf');
                    $('#textDiv').summernote('destroy');
                    _("#titoloEdit").setAttribute("readonly", "true");

                }else{
                    this.innerHTML = '<i class="bi bi-x-square"></i> Chiudi editor';
                    $("#creaPdf").html('<i class="bi bi-floppy me-2"></i>  Salva');
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
                    _("#titoloEdit").removeAttribute("readonly");
                }
            });
        }
}