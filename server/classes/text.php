<?php
class textObj extends db_Class {

    public function saveText ($idNota, $idUser, $dataTesto, $titolo, $pubblico, $testo){

        $text = $testo;
        $sql = "SELECT * FROM ".prefixTable."text WHERE idNota = $idNota";
        $result = $this->get_row($sql);
        // echo ($sql);
        // print_r($result);
        if ($result){
            if ($result->testo !== $testo || $result->titolo !== $titolo || $result->pubblico !== $pubblico ){
                $sql = "INSERT INTO ".prefixTable."text_v 
                        SELECT * , CURRENT_TIMESTAMP FROM ".prefixTable."text WHERE idNota = $idNota;";
                $this->query ($sql);
                $sql = "UPDATE ".prefixTable."text SET testo='$testo', dataTesto = $dataTesto, titolo = '$titolo', pubblico = $pubblico WHERE idNota = $idNota;";
                return  $this->query ($sql);
            }else{
                return "OK";
            }
        }else{
            $sql = "INSERT INTO ".prefixTable."text (idUser, dataTesto, titolo, pubblico, testo)
            VALUES
            ($idUser, $dataTesto, '$titolo', $pubblico, '$testo');";
            return  $this->insertQuery ($sql);
        }
    }
    public function getTextHome ($idUser,$dateOfText){
        $result = new stdClass();
        $sql = "SELECT idNota FROM ".prefixTable."text WHERE idUser = $idUser AND dataTesto <= $dateOfText ORDER BY dataTesto DESC, idNota DESC";
        // echo($sql);
        $result = $this->get_row($sql);
        return ($result)? $this->getTextId ($idUser,$result->idNota):null;
     }
    public function getTextId ($idUser, $idNota){
        $result = new stdClass();
        $sql = "SELECT * FROM ".prefixTable."text WHERE idNota = ".$idNota."";
        // echo($sql);
        $result = $this->get_row($sql);
        $sql = "SELECT idNota, titolo, dataTesto FROM ".prefixTable."text WHERE idUser = $idUser ORDER BY dataTesto DESC, idNota DESC";
        $result->dateNote = $this->get_results($sql);
        return $result;
     }
    public function getTextShared ($idNota){
        $result = new stdClass();
        $sql = "SELECT * FROM ".prefixTable."text WHERE idNota = ".$idNota."";
        // echo($sql);
        $result = $this->get_row($sql);
        return $result;
     }
    public function deleteText ($idNota, $idUser){
        global $myApp;
        
        $sql = "DELETE FROM ".prefixTable."text WHERE idNota = ".$idNota."";
        $this->query($sql);

        return $myApp["userObj"]->getUserEnviroment ($idUser);
     }

}

$myApp["textObj"] = new textObj();