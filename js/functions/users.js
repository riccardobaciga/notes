import showUsers from "../pages/users.js";

export default async function getUsers(nomeUsers="") {
    await callServer({
        object : "users",
        action : "getUsers",
        param: {}
      }).then((data) => {
        setTimeout(function() {
          showUsers(data);
        }, 1000);
        
      });
}