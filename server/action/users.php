<?php
class users extends actionClass {
    public function getUsers ($param){
        global $myApp;
        // $this->decodeParam ($param);
        $result = new stdClass();
        $result->users = $myApp["usersObj"]->getUsers ();

        return json_encode($result);
    }
}

$myApp["users"] = new users();