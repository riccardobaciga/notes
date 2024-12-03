export default function createMenu(menu){
    
    return `
        ${$_("NOTA")}
        <div class="row">
        ${menu.map((tmp) => {
            return `
                <a href="#" 
                    class="col btn hint--right" id="${tmp.link}"
                    aria-help = "${$_(tmp.help)}"
                    data-bs-dismiss="offcanvas" aria-label="Close"
                    ><i class="bi bi-${tmp.icon}"></i><br>${$_(tmp.label)}</a>`;
        }).join("")
            }
        </div>
    `;
    
}