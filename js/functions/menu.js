import showMenu from "../pages/menu.js";

export default async function getMenu(nomeMenu="") {
    await callServer({
        object : "menu",
        action : "getMenu",
        param: {"livello":(myApp.user)?myApp.user.level:"1"}
      }).then((data) => {
        showMenu(data);
      });
}