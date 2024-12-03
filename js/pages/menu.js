import createMenu from "../components/menu.js";
export default function showMenu(data) {
    myApp.menus = data.menu
    myApp.appMenu = createMenu();
}