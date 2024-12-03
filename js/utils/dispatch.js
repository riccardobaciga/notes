// import getHome from "../functions/home.js";
import getUsers from "../functions/users.js";
import logout from "../functions/logout.js";
import showInfo from "../pages/info.js";
import showPassword from "../pages/password.js";

export default function dispatch(){
    const path = window.location.hash.slice(1);
    if (path !== ""){
        var trovato = true;
        const tmp = path.split('&')
        const what = tmp[0];
        const param = (tmp.length > 1)? tmp[1]:"";

        switch (what){
            case "home":
                // getHome();
                break;
            case "profiloUtente":
                showInfo();
                break;
            case "cambiaPassword":
                showPassword();
                break;
            case "users":
                getUsers();
                break;
            case "quit":
                logout();
                break;
            case "explorer":
                window.open(getServerUrl()+"server/admin/tinyFilemanager/tinyfilemanager.php", "_blank");
                break;
            case "database":
                window.open(getServerUrl()+"server/admin/phpLiteAdmin/phpliteadmin.php", "_blank");
                break;
            default:
                trovato = false
        }
        
        window.location.hash = "";

        if (trovato){
            myApp.currentPage = what;
        }
    }
}