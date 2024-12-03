import createTextInput from "../components/textInput.js";

export default function userDetail(user){
       // createSelect(name, elements, valueLabel="value", textLabel = "text", defaultValue = "Open this select menu")
       /*
       const elements = data.level.map(level => ({
              value: level.idLevel,
              text: level.levelLabel
       }));
       */
    return`
         ${createTextInput("cognomeInfo","Cognome","Cognome",user.cognome,)}
         ${createTextInput("nomeInfo","Nome","Nome",user.nome,)}
         ${createTextInput("telefonoInfo","Telefono","Telefono",user.telefono,)}
         ${createTextInput("mailInfo","Mail","Mail",user.mail,)}
         ${createTextInput("levelInfo","Livello","Livello",user.levelLabel,)}
        `;
 }

 export function setUserDetail(){
        _("#cognomeInfo").value = user.cognome;
        _("#nomeInfo").value = user.nome;
        _("#telefonoInfo").value = user.telefono;
        _("#mailInfo").value = user.mail;
        _("#levelInfo").value = user.levelLabel;

 }