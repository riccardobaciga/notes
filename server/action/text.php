<?php
class text extends actionClass {
    public function saveText ($param){
        global $myApp;
        $result = new stdClass();
        
        $result->testo = $myApp["textObj"]->saveText ($param->idNota, $param->idUser, $param->dataTesto, $param->titolo, $param->pubblico, $param->testo);
        return json_encode($result);
    }
    public function getTextHome ($param){
        global $myApp;
        $result = new stdClass();
        $result->testo = $myApp["textObj"]->getTextHome ($param->idUser, $param->dateOfText);

        return json_encode($result);
    }
    public function getTextId ($param){
        global $myApp;
        $result = new stdClass();   

        $result->testo = $myApp["textObj"]->getTextId ($param->idUser, $param->idNota);
        return json_encode($result);
    }
    public function deleteText ($param){
        global $myApp;
       $result = new stdClass();
        
        $result->testo = $myApp["textObj"]->deleteText ($param->idNota, $param->idUser);

        return json_encode($result);
    }
}

$myApp["text"] = new text();