<?php
class userObj extends db_Class
{

    public function changePassword($idUser, $login, $oldPassword, $newPassword)
    {
        $pwdEncrOld = $this->encrypt($oldPassword, $login, $idUser);
        $pwdEncrNew = $this->encrypt($newPassword, $login, $idUser);
        $query = "SELECT * FROM " . prefixTable . "users user INNER JOIN 
                                " . prefixTable . "levels level ON
                                user.idLevel = level.idLevel
            WHERE user.login = '$login' and idUser = $idUser AND (user.password = '$oldPassword' or user.password = '$pwdEncrOld')";
        $user = $this->get_row($query);
        if ($user == null) {
            $result = new stdClass();
            // $result->error = "DIGITARE IL NUMERO CORRETTO ->$securityNumber<- ->$captcha<-";
            $result->error = "Utente non trovato: login o password errati";
            return $result;
        }
        $query = "Update " . prefixTable . "users set password = '$pwdEncrNew'
            WHERE idUser = $idUser";
        $user = $this->get_row($query);

    }
    public function checkUser($login, $password, $securityNumber)
    {
        session_start();
        
        $captcha = $_SESSION['captcha'];
        if ($securityNumber != $captcha) {
            $result = new stdClass();
            $result->error = "DIGITARE IL NUMERO CORRETTO";
            return $result;
        }
        $user = $this->get_row("SELECT * FROM " . prefixTable . "users WHERE login = '$login'");
        if ($user == null) {
            $result = new stdClass();
            $result->error = "Utente non trovato: login o password errati";
            return $result;
        }
        
        $pwdEncr = $this->encrypt($password, $user->login, $user->idUser);
        $query = "SELECT * FROM " . prefixTable . "users user
                        WHERE user.login = '$login' 
                        AND (user.password = '$password' or user.password = '$pwdEncr')";
        $user = $this->get_row($query);
        if ($user == null) {
            $result = new stdClass();
            $result->error = "Utente non trovato: login o password errati";
            return $result;
        }
        if ($user->password == $password) {
            $result = new stdClass();
            $result->error = "Cambiare la password dopo il primo accesso.";
            // return $result;
        }
        
        if ($user->mailVerified == 0) {
            // $result = new stdClass();
            // $this->sendMailUser($user);
            // $result->error = "Confermare la propria mail utilizzando il link inviato alla casella di posta.";
            // return $result;
        }

        return $this->getUserEnviroment($user->idUser);

    }


    public function getUserEnviroment($idUser)
    {
        global $myApp;

        $result = new stdClass();
        $currentDate = date('Ymd');
        $result = $this->getUser($idUser);
        $result->menu = $myApp["menuObj"]->getMenu($result->level);
        $result->testo = $myApp["textObj"]->getTextHome($result->idUser, $currentDate);
        // print_r($result);

        return $result;
    }

    public function getUser($idUser)
    {

        $query = "SELECT * FROM 
                    " . prefixTable . "users user INNER JOIN 
                    " . prefixTable . "levels level ON user.idLevel = level.idLevel
                    WHERE idUser = '$idUser'";

        return $this->get_row($query);
    }


    function encrypt($data, $key1, $key2)
    {


        $encryption_method = 'AES-256-CBC';
        $secret_key = $key1;
        $secret_iv = $key2; // Initialization vector

        // Create an initialization vector
        $iv = $this->getLeft16Chars($data);

        // Encrypt the data
        $encrypted = openssl_encrypt($data, $encryption_method, $secret_key, 0, $iv);

        // Return the encrypted data and the IV (you'll need the IV for decryption)
        return base64_encode($encrypted . '::' . $iv);
    }

    function getLeft16Chars($inputString)
    {
        $fill = substr($inputString, -1);
        // Pad the string with '@' on the left if it's shorter than 16 characters
        $paddedString = str_pad($inputString, 16, $fill, STR_PAD_LEFT);
        // Return the leftmost 16 characters
        return substr($paddedString, 0, 16);
    }

    function sendMailUser($user)
    {
        $to = 'destinatario@example.com'; // Inserisci l'indirizzo email del destinatario
        $subject = 'Oggetto dell\'email'; // Oggetto dell'email

        $param = new stdClass(); 
        $param->object = "user";
        $param->action = "verifyMail";
        $param->param = new stdClass(); 
        $param->param->user = $user;

        // Intestazioni dell'email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: mittente@example.com" . "\r\n"; // Inserisci l'indirizzo email del mittente
        $link = baseUrl . "api.php?" . base64_encode(json_encode( $param));
        // Corpo dell'email in HTML
        $message = "
            <html>
            <head>
            <title>CONFERMA MAIL NOTES - Everiwhere</title>
            </head>
            <body>
            <h1>Ciao fai click sul link sotto per confermare la tua mail.</h1>
                <a href=\"$link\">$link</p>
            </body>
            </html>
            ";

        // Invia l'email
        if (mail($to, $subject, $message, $headers)) {
            echo 'Email inviata con successo!';
        } else {
            echo 'Errore nell\'invio dell\'email.';
        }
    }
}

$myApp["userObj"] = new userObj();