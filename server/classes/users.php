<?php
class usersObj  extends db_Class {
    
    public function getUsers (){

        $query = "SELECT * FROM ".prefixTable."users user INNER JOIN 
                                ".prefixTable."levels level ON
                                user.idLevel = level.idLevel ORDER BY cognome, nome";
        
        return  $this->get_results ($query);
    }
}

$myApp["usersObj"] = new usersObj();