export default function createMenu(title){
    
    return  /* html */ `
    <a class="navbar-brand hint--right" href="#" id="menuNoteBtn"  aria-help = "${$_("Apri menu note")}"  data-bs-toggle="offcanvas" data-bs-target="#offCanvasListText" aria-controls="offCanvasListText">
        <i class="bi bi-card-list"></i>
    </a>
    <div class="d-flex flex-grow-1">
        <input type="text" class="form-control me-2" id="titoloEdit" name="titoloEdit" placeholder="titolo" valueOf="titoloNota">
    </div>
    <a class="navbar-brand hint--left" href="#" id="menuUtenteBtn" aria-help = "${$_("Apri menu utente")}" data-bs-toggle="offcanvas" data-bs-target="#userMenu" aria-controls="userMenu">
        <i class="bi bi-person-circle"></i>
    </a>
`;;
    
}