import createEditPage from "../components/editPage.js";

export async function saveShare() {
  const paramToSend = {
      idNota : _("#idNota").value,
      idUser : 0,
      dataTesto : myApp.todayFormatted,
      titolo : _("#titoloEdit").value,
      pubblico : 1,
      testo : btoa($("#textDiv").summernote('code'))
  }
  showEnviroment(paramToSend, "saveText");
}

export default async function saveText() {
    const paramToSend = {
        idNota : _("#idNota").value,
        idUser : myApp.user.idUser,
        dataTesto : myApp.todayFormatted,
        titolo : _("#titoloEdit").value,
        pubblico : (_("#isPblic").checked)?1:0,
        testo : btoa($("#textDiv").summernote('code'))
    }
    showEnviroment(paramToSend, "saveText");
}

export async function getTextId(idNota) {
    const paramToSend = {
        idUser : myApp.user.idUser,
        idNota : idNota
    }
    showEnviroment(paramToSend, "getTextId");
}

export async function deleteText(idNota) {
    const paramToSend = {
        idNota : idNota,
        idUser : myApp.user.idUser
    }
    showEnviroment(paramToSend, "deleteText");
}

async function showEnviroment(paramToSend, action){
  await callServer({
    object : "text",
    action : action,
    param: paramToSend
  }).then((data) => {
    myApp.user = data;
    createEditPage();
  });
}