<?php
class menu extends actionClass {
    public function getMenu ($param){
        global $myApp;
        // print_r($param);
        // http://localhost:8001/server/api.php
        $result = new stdClass();
        $result->menu = $myApp["menuObj"]->getMenu ($param->livello);

        return json_encode($result);
    }
}

$myApp["menu"] = new menu();