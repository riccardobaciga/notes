export default function createMenu(menu){
    
    if (menu == null){
        return ``;
    }

    const subMenu = function (elem){
        return /* html*/ ` 
            <li class="list-group-item dropdown">
                <a class="btn dropdown-toggle p0" href="#" id="${elem.link}" helpComment = "${$_(elem.help)}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-${elem.icon}"></i> 
                    ${$_(elem.label)}
                </a>
                <ul class="dropdown-menu">
                    ${elem.sub.map((item) => {
                            return `<li><a class="dropdown-item" href="#${elem.link}" id="${elem.link}" helpComment = "${$_(elem.help)}"  href="#"><i class="bi bi-${item.icon}"></i> 
                            ${$_(item.label)}</a></li>`;
                    })
                    }
                </ul>
            </li>
          `;
    }
    const menuItem = function (elem){
        return /* html */ ` 
            <li class="list-group-item " classOf="${elem.link}" aria-help = "${$_(elem.help)}">
              <a class="nav-link hint--right" href="#${elem.link}" aria-help = "${$_(elem.help)}"
                 id="${elem.link}" aria-current="page" href="#${elem.link}">
                 <i class="bi bi-${elem.icon}"></i> 
                 ${$_(elem.label)}</a>
            </li>
          `;
    }
    return `<ul class="list-group">`+menu.map((item) => {
        if(item.submenu.trim().length < 2){
            return menuItem(item);
        }else{
            return subMenu(item);
        }
    }).join("")+`</ul>`;
    
}