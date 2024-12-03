<?php
class user extends actionClass {
    public function checkUser ($param){
        global $myApp;
        // $this->decodeParam ($param);
        // print_r($param);
        $result = new stdClass();
        $result = $myApp["userObj"]->checkUser ($param->login, $param->password, $param->securityNumber);

        return json_encode($result);
    }

    public function changePassword ($param){
        global $myApp;
        $result = new stdClass();
        $result = $myApp["userObj"]->changePassword ($param->idUser, $param->login, $param->oldPassword, $param->newPassword);

        return json_encode($result);
    }

    public function getUserEnviroment ($param){
        global $myApp;
        // $this->decodeParam ($param);
        // print_r($param);
        $result = new stdClass();
        $result = $myApp["userObj"]->getUserEnviroment ($param->idUser);

        return json_encode($result);
    }
}
$myApp["user"] = new user();